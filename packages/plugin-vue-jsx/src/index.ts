import crypto from 'node:crypto'
import path from 'node:path'
import type { types } from '@babel/core'
import * as babel from '@babel/core'
import jsx from '@vue/babel-plugin-jsx'
import { createFilter, normalizePath } from 'vite'
import type { ComponentOptions } from 'vue'
import type { Plugin } from 'vite'
import type { Options } from './types'

export * from './types'

const ssrRegisterHelperId = '/__vue-jsx-ssr-register-helper'
const ssrRegisterHelperCode =
  `import { useSSRContext } from "vue"\n` +
  // the const here is just to work around the Bun bug where
  // Function.toString() isn't working as intended
  // https://github.com/oven-sh/bun/issues/9543
  `export const ssrRegisterHelper = ${ssrRegisterHelper.toString()}`

/**
 * This function is serialized with toString() and evaluated as a virtual
 * module during SSR
 */
function ssrRegisterHelper(comp: ComponentOptions, filename: string) {
  const setup = comp.setup
  comp.setup = (props, ctx) => {
    // @ts-ignore
    const ssrContext = useSSRContext()
    ;(ssrContext.modules || (ssrContext.modules = new Set())).add(filename)
    if (setup) {
      return setup(props, ctx)
    }
  }
}

function vueJsxPlugin(options: Options = {}): Plugin {
  let root = ''
  let needHmr = false
  let needSourceMap = true

  const {
    include,
    exclude,
    babelPlugins = [],
    defineComponentName = ['defineComponent'],
    tsPluginOptions = {},
    ...babelPluginOptions
  } = options
  const filter = createFilter(include || /\.[jt]sx$/, exclude)

  return {
    name: 'vite:vue-jsx',

    config(config) {
      const parseDefine = (v: unknown) => {
        try {
          return typeof v === 'string' ? JSON.parse(v) : v
        } catch (err) {
          return v
        }
      }
      return {
        // only apply esbuild to ts files
        // since we are handling jsx and tsx now
        esbuild: {
          include: /\.ts$/,
        },
        define: {
          __VUE_OPTIONS_API__:
            parseDefine(config.define?.__VUE_OPTIONS_API__) ?? true,
          __VUE_PROD_DEVTOOLS__:
            parseDefine(config.define?.__VUE_PROD_DEVTOOLS__) ?? false,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
            parseDefine(
              config.define?.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__,
            ) ?? false,
        },
      }
    },

    configResolved(config) {
      needHmr = config.command === 'serve' && !config.isProduction
      needSourceMap = config.command === 'serve' || !!config.build.sourcemap
      root = config.root
    },

    resolveId(id) {
      if (id === ssrRegisterHelperId) {
        return id
      }
    },

    load(id) {
      if (id === ssrRegisterHelperId) {
        return ssrRegisterHelperCode
      }
    },

    async transform(code, id, opt) {
      const ssr = opt?.ssr === true
      const [filepath] = id.split('?')

      // use id for script blocks in Vue SFCs (e.g. `App.vue?vue&type=script&lang.jsx`)
      // use filepath for plain jsx files (e.g. App.jsx)
      if (filter(id) || filter(filepath)) {
        const plugins = [[jsx, babelPluginOptions], ...babelPlugins]
        if (id.endsWith('.tsx') || filepath.endsWith('.tsx')) {
          plugins.push([
            // @ts-ignore missing type
            await import('@babel/plugin-transform-typescript').then(
              (r) => r.default,
            ),
            // @ts-ignore
            { ...tsPluginOptions, isTSX: true, allowExtensions: true },
          ])
        }

        if (!ssr && !needHmr) {
          plugins.push(() => {
            return {
              visitor: {
                CallExpression: {
                  enter(_path: babel.NodePath<types.CallExpression>) {
                    if (
                      isDefineComponentCall(_path.node, defineComponentName)
                    ) {
                      const callee = _path.node.callee as types.Identifier
                      callee.name = `/* @__PURE__ */ ${callee.name}`
                    }
                  },
                },
              },
            }
          })
        }

        const result = babel.transformSync(code, {
          babelrc: false,
          ast: true,
          plugins,
          sourceMaps: needSourceMap,
          sourceFileName: id,
          configFile: false,
        })!

        if (!ssr && !needHmr) {
          if (!result.code) return
          return {
            code: result.code,
            map: result.map,
          }
        }

        interface HotComponent {
          local: string
          exported: string
          id: string
        }

        // check for hmr injection
        const declaredComponents: string[] = []
        const hotComponents: HotComponent[] = []
        let hasDefault = false

        for (const node of result.ast!.program.body) {
          if (node.type === 'VariableDeclaration') {
            const names = parseComponentDecls(node, defineComponentName)
            if (names.length) {
              declaredComponents.push(...names)
            }
          }

          if (node.type === 'ExportNamedDeclaration') {
            if (
              node.declaration &&
              node.declaration.type === 'VariableDeclaration'
            ) {
              hotComponents.push(
                ...parseComponentDecls(
                  node.declaration,
                  defineComponentName,
                ).map((name) => ({
                  local: name,
                  exported: name,
                  id: getHash(id + name),
                })),
              )
            } else if (node.specifiers.length) {
              for (const spec of node.specifiers) {
                if (
                  spec.type === 'ExportSpecifier' &&
                  spec.exported.type === 'Identifier'
                ) {
                  const matched = declaredComponents.find(
                    (name) => name === spec.local.name,
                  )
                  if (matched) {
                    hotComponents.push({
                      local: spec.local.name,
                      exported: spec.exported.name,
                      id: getHash(id + spec.exported.name),
                    })
                  }
                }
              }
            }
          }

          if (node.type === 'ExportDefaultDeclaration') {
            if (node.declaration.type === 'Identifier') {
              const _name = node.declaration.name
              const matched = declaredComponents.find((name) => name === _name)
              if (matched) {
                hotComponents.push({
                  local: _name,
                  exported: 'default',
                  id: getHash(id + 'default'),
                })
              }
            } else if (
              isDefineComponentCall(node.declaration, defineComponentName)
            ) {
              hasDefault = true
              hotComponents.push({
                local: '__default__',
                exported: 'default',
                id: getHash(id + 'default'),
              })
            }
          }
        }

        if (hotComponents.length) {
          if (hasDefault && (needHmr || ssr)) {
            result.code =
              result.code!.replace(
                /export default defineComponent/g,
                `const __default__ = defineComponent`,
              ) + `\nexport default __default__`
          }

          if (needHmr && !ssr && !/\?vue&type=script/.test(id)) {
            let code = result.code
            let callbackCode = ``
            for (const { local, exported, id } of hotComponents) {
              code +=
                `\n${local}.__hmrId = "${id}"` +
                `\n__VUE_HMR_RUNTIME__.createRecord("${id}", ${local})`
              callbackCode += `\n__VUE_HMR_RUNTIME__.reload("${id}", __${exported})`
            }

            const newCompNames = hotComponents
              .map((c) => `${c.exported}: __${c.exported}`)
              .join(',')

            code += `\nimport.meta.hot.accept(({${newCompNames}}) => {${callbackCode}\n})`
            result.code = code
          }

          if (ssr) {
            const normalizedId = normalizePath(path.relative(root, id))
            let ssrInjectCode =
              `\nimport { ssrRegisterHelper } from "${ssrRegisterHelperId}"` +
              `\nconst __moduleId = ${JSON.stringify(normalizedId)}`
            for (const { local } of hotComponents) {
              ssrInjectCode += `\nssrRegisterHelper(${local}, __moduleId)`
            }
            result.code += ssrInjectCode
          }
        }

        if (!result.code) return
        return {
          code: result.code,
          map: result.map,
        }
      }
    },
  }
}

function parseComponentDecls(
  node: types.VariableDeclaration,
  fnNames: string[],
) {
  const names = []
  for (const decl of node.declarations) {
    if (
      decl.id.type === 'Identifier' &&
      isDefineComponentCall(decl.init, fnNames)
    ) {
      names.push(decl.id.name)
    }
  }
  return names
}

function isDefineComponentCall(
  node: types.Node | null | undefined,
  names: string[],
) {
  return (
    node &&
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    names.includes(node.callee.name)
  )
}

const hash =
  // eslint-disable-next-line n/no-unsupported-features/node-builtins -- crypto.hash is supported in Node 21.7.0+, 20.12.0+
  crypto.hash ??
  ((
    algorithm: string,
    data: crypto.BinaryLike,
    outputEncoding: crypto.BinaryToTextEncoding,
  ) => crypto.createHash(algorithm).update(data).digest(outputEncoding))

function getHash(text: string) {
  return hash('sha256', text, 'hex').substring(0, 8)
}

export default vueJsxPlugin
