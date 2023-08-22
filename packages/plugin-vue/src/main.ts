import path from 'node:path'
import fs from 'node:fs'
import type { SFCBlock, SFCDescriptor } from 'vue/compiler-sfc'
import type { PluginContext, TransformPluginContext } from 'rollup'
import type { RawSourceMap } from 'source-map'
import type { EncodedSourceMap as TraceEncodedSourceMap } from '@jridgewell/trace-mapping'
import { TraceMap, eachMapping } from '@jridgewell/trace-mapping'
import type { EncodedSourceMap as GenEncodedSourceMap } from '@jridgewell/gen-mapping'
import { addMapping, fromMap, toEncodedMap } from '@jridgewell/gen-mapping'
import { normalizePath, transformWithEsbuild } from 'vite'
import {
  createDescriptor,
  getDescriptor,
  getPrevDescriptor,
  setSrcDescriptor,
} from './utils/descriptorCache'
import {
  canInlineMain,
  isUseInlineTemplate,
  resolveScript,
  scriptIdentifier,
} from './script'
import { transformTemplateInMain } from './template'
import { isEqualBlock, isOnlyTemplateChanged } from './handleHotUpdate'
import { createRollupError } from './utils/error'
import { EXPORT_HELPER_ID } from './helper'
import type { ResolvedOptions } from '.'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function transformMain(
  code: string,
  filename: string,
  options: ResolvedOptions,
  pluginContext: TransformPluginContext,
  ssr: boolean,
  asCustomElement: boolean,
) {
  const { devServer, isProduction, devToolsEnabled } = options

  const prevDescriptor = getPrevDescriptor(filename)
  const { descriptor, errors } = createDescriptor(filename, code, options)

  if (fs.existsSync(filename))
    // set descriptor for HMR if it's not set yet
    getDescriptor(filename, options, true, true)

  if (errors.length) {
    errors.forEach((error) =>
      pluginContext.error(createRollupError(filename, error)),
    )
    return null
  }

  // feature information
  const attachedProps: [string, string][] = []
  const hasScoped = descriptor.styles.some((s) => s.scoped)

  // script
  const { code: scriptCode, map: scriptMap } = await genScriptCode(
    descriptor,
    options,
    pluginContext,
    ssr,
  )

  // template
  const hasTemplateImport =
    descriptor.template && !isUseInlineTemplate(descriptor, !devServer)

  let templateCode = ''
  let templateMap: RawSourceMap | undefined = undefined
  if (hasTemplateImport) {
    ;({ code: templateCode, map: templateMap } = await genTemplateCode(
      descriptor,
      options,
      pluginContext,
      ssr,
    ))
  }

  if (hasTemplateImport) {
    attachedProps.push(
      ssr ? ['ssrRender', '_sfc_ssrRender'] : ['render', '_sfc_render'],
    )
  } else {
    // #2128
    // User may empty the template but we didn't provide rerender function before
    if (
      prevDescriptor &&
      !isEqualBlock(descriptor.template, prevDescriptor.template)
    ) {
      attachedProps.push([ssr ? 'ssrRender' : 'render', '() => {}'])
    }
  }

  // styles
  const stylesCode = await genStyleCode(
    descriptor,
    pluginContext,
    asCustomElement,
    attachedProps,
  )

  // custom blocks
  const customBlocksCode = await genCustomBlockCode(descriptor, pluginContext)

  const output: string[] = [
    scriptCode,
    templateCode,
    stylesCode,
    customBlocksCode,
  ]
  if (hasScoped) {
    attachedProps.push([`__scopeId`, JSON.stringify(`data-v-${descriptor.id}`)])
  }
  if (devToolsEnabled || (devServer && !isProduction)) {
    // expose filename during serve for devtools to pickup
    attachedProps.push([
      `__file`,
      JSON.stringify(isProduction ? path.basename(filename) : filename),
    ])
  }

  // HMR
  if (
    devServer &&
    devServer.config.server.hmr !== false &&
    !ssr &&
    !isProduction
  ) {
    output.push(`_sfc_main.__hmrId = ${JSON.stringify(descriptor.id)}`)
    output.push(
      `typeof __VUE_HMR_RUNTIME__ !== 'undefined' && ` +
        `__VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)`,
    )
    // check if the template is the only thing that changed
    if (prevDescriptor && isOnlyTemplateChanged(prevDescriptor, descriptor)) {
      output.push(`export const _rerender_only = true`)
    }
    output.push(
      `import.meta.hot.accept(mod => {`,
      `  if (!mod) return`,
      `  const { default: updated, _rerender_only } = mod`,
      `  if (_rerender_only) {`,
      `    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)`,
      `  } else {`,
      `    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)`,
      `  }`,
      `})`,
    )
  }

  // SSR module registration by wrapping user setup
  if (ssr) {
    const normalizedFilename = normalizePath(
      path.relative(options.root, filename),
    )
    output.push(
      `import { useSSRContext as __vite_useSSRContext } from 'vue'`,
      `const _sfc_setup = _sfc_main.setup`,
      `_sfc_main.setup = (props, ctx) => {`,
      `  const ssrContext = __vite_useSSRContext()`,
      `  ;(ssrContext.modules || (ssrContext.modules = new Set())).add(${JSON.stringify(
        normalizedFilename,
      )})`,
      `  return _sfc_setup ? _sfc_setup(props, ctx) : undefined`,
      `}`,
    )
  }

  let resolvedMap: RawSourceMap | undefined = undefined
  if (options.sourceMap) {
    if (scriptMap && templateMap) {
      // if the template is inlined into the main module (indicated by the presence
      // of templateMap), we need to concatenate the two source maps.

      const gen = fromMap(
        // version property of result.map is declared as string
        // but actually it is `3`
        scriptMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap,
      )
      const tracer = new TraceMap(
        // same above
        templateMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap,
      )
      const offset = (scriptCode.match(/\r?\n/g)?.length ?? 0) + 1
      eachMapping(tracer, (m) => {
        if (m.source == null) return
        addMapping(gen, {
          source: m.source,
          original: { line: m.originalLine, column: m.originalColumn },
          generated: {
            line: m.generatedLine + offset,
            column: m.generatedColumn,
          },
        })
      })

      // same above
      resolvedMap = toEncodedMap(gen) as Omit<
        GenEncodedSourceMap,
        'version'
      > as RawSourceMap
      // if this is a template only update, we will be reusing a cached version
      // of the main module compile result, which has outdated sourcesContent.
      resolvedMap.sourcesContent = templateMap.sourcesContent
    } else {
      // if one of `scriptMap` and `templateMap` is empty, use the other one
      resolvedMap = scriptMap ?? templateMap
    }
  }

  if (!attachedProps.length) {
    output.push(`export default _sfc_main`)
  } else {
    output.push(
      `import _export_sfc from '${EXPORT_HELPER_ID}'`,
      `export default /*#__PURE__*/_export_sfc(_sfc_main, [${attachedProps
        .map(([key, val]) => `['${key}',${val}]`)
        .join(',')}])`,
    )
  }

  // handle TS transpilation
  let resolvedCode = output.join('\n')
  const lang = descriptor.scriptSetup?.lang || descriptor.script?.lang

  if (
    lang &&
    /tsx?$/.test(lang) &&
    !descriptor.script?.src // only normal script can have src
  ) {
    const { code, map } = await transformWithEsbuild(
      resolvedCode,
      filename,
      {
        loader: 'ts',
        target: 'esnext',
        sourcemap: options.sourceMap,
      },
      resolvedMap,
    )
    resolvedCode = code
    resolvedMap = resolvedMap ? (map as any) : resolvedMap
  }

  return {
    code: resolvedCode,
    map: resolvedMap || {
      mappings: '',
    },
    meta: {
      vite: {
        lang: descriptor.script?.lang || descriptor.scriptSetup?.lang || 'js',
      },
    },
  }
}

async function genTemplateCode(
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
  pluginContext: PluginContext,
  ssr: boolean,
) {
  const template = descriptor.template!
  const hasScoped = descriptor.styles.some((style) => style.scoped)

  // If the template is not using pre-processor AND is not using external src,
  // compile and inline it directly in the main module. When served in vite this
  // saves an extra request per SFC which can improve load performance.
  if ((!template.lang || template.lang === 'html') && !template.src) {
    return transformTemplateInMain(
      template.content,
      descriptor,
      options,
      pluginContext,
      ssr,
    )
  } else {
    if (template.src) {
      await linkSrcToDescriptor(
        template.src,
        descriptor,
        pluginContext,
        hasScoped,
      )
    }
    const src = template.src || descriptor.filename
    const srcQuery = template.src
      ? hasScoped
        ? `&src=${descriptor.id}`
        : '&src=true'
      : ''
    const scopedQuery = hasScoped ? `&scoped=${descriptor.id}` : ``
    const attrsQuery = attrsToQuery(template.attrs, 'js', true)
    const query = `?vue&type=template${srcQuery}${scopedQuery}${attrsQuery}`
    const request = JSON.stringify(src + query)
    const renderFnName = ssr ? 'ssrRender' : 'render'
    return {
      code: `import { ${renderFnName} as _sfc_${renderFnName} } from ${request}`,
      map: undefined,
    }
  }
}

async function genScriptCode(
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
  pluginContext: PluginContext,
  ssr: boolean,
): Promise<{
  code: string
  map: RawSourceMap | undefined
}> {
  let scriptCode = `const ${scriptIdentifier} = {}`
  let map: RawSourceMap | undefined

  const script = resolveScript(descriptor, options, ssr)
  if (script) {
    // If the script is js/ts and has no external src, it can be directly placed
    // in the main module.
    if (canInlineMain(descriptor, options)) {
      if (!options.compiler.version) {
        // if compiler-sfc exposes no version, it's < 3.3 and doesn't support
        // genDefaultAs option.
        const userPlugins = options.script?.babelParserPlugins || []
        const defaultPlugins =
          script.lang === 'ts'
            ? userPlugins.includes('decorators')
              ? (['typescript'] as const)
              : (['typescript', 'decorators-legacy'] as const)
            : []
        scriptCode = options.compiler.rewriteDefault(
          script.content,
          scriptIdentifier,
          [...defaultPlugins, ...userPlugins],
        )
      } else {
        scriptCode = script.content
      }
      map = script.map
    } else {
      if (script.src) {
        await linkSrcToDescriptor(script.src, descriptor, pluginContext, false)
      }
      const src = script.src || descriptor.filename
      const langFallback = (script.src && path.extname(src).slice(1)) || 'js'
      const attrsQuery = attrsToQuery(script.attrs, langFallback)
      const srcQuery = script.src ? `&src=true` : ``
      const query = `?vue&type=script${srcQuery}${attrsQuery}`
      const request = JSON.stringify(src + query)
      scriptCode =
        `import _sfc_main from ${request}\n` + `export * from ${request}` // support named exports
    }
  }
  return {
    code: scriptCode,
    map,
  }
}

async function genStyleCode(
  descriptor: SFCDescriptor,
  pluginContext: PluginContext,
  asCustomElement: boolean,
  attachedProps: [string, string][],
) {
  let stylesCode = ``
  let cssModulesMap: Record<string, string> | undefined
  if (descriptor.styles.length) {
    for (let i = 0; i < descriptor.styles.length; i++) {
      const style = descriptor.styles[i]
      if (style.src) {
        await linkSrcToDescriptor(
          style.src,
          descriptor,
          pluginContext,
          style.scoped,
        )
      }
      const src = style.src || descriptor.filename
      // do not include module in default query, since we use it to indicate
      // that the module needs to export the modules json
      const attrsQuery = attrsToQuery(style.attrs, 'css')
      const srcQuery = style.src
        ? style.scoped
          ? `&src=${descriptor.id}`
          : '&src=true'
        : ''
      const directQuery = asCustomElement ? `&inline` : ``
      const scopedQuery = style.scoped ? `&scoped=${descriptor.id}` : ``
      const query = `?vue&type=style&index=${i}${srcQuery}${directQuery}${scopedQuery}`
      const styleRequest = src + query + attrsQuery
      if (style.module) {
        if (asCustomElement) {
          throw new Error(
            `<style module> is not supported in custom elements mode.`,
          )
        }
        const [importCode, nameMap] = genCSSModulesCode(
          i,
          styleRequest,
          style.module,
        )
        stylesCode += importCode
        Object.assign((cssModulesMap ||= {}), nameMap)
      } else {
        if (asCustomElement) {
          stylesCode += `\nimport _style_${i} from ${JSON.stringify(
            styleRequest,
          )}`
        } else {
          stylesCode += `\nimport ${JSON.stringify(styleRequest)}`
        }
      }
      // TODO SSR critical CSS collection
    }
    if (asCustomElement) {
      attachedProps.push([
        `styles`,
        `[${descriptor.styles.map((_, i) => `_style_${i}`).join(',')}]`,
      ])
    }
  }
  if (cssModulesMap) {
    const mappingCode =
      Object.entries(cssModulesMap).reduce(
        (code, [key, value]) => code + `"${key}":${value},\n`,
        '{\n',
      ) + '}'
    stylesCode += `\nconst cssModules = ${mappingCode}`
    attachedProps.push([`__cssModules`, `cssModules`])
  }
  return stylesCode
}

function genCSSModulesCode(
  index: number,
  request: string,
  moduleName: string | boolean,
): [importCode: string, nameMap: Record<string, string>] {
  const styleVar = `style${index}`
  const exposedName = typeof moduleName === 'string' ? moduleName : '$style'
  // inject `.module` before extension so vite handles it as css module
  const moduleRequest = request.replace(/\.(\w+)$/, '.module.$1')
  return [
    `\nimport ${styleVar} from ${JSON.stringify(moduleRequest)}`,
    { [exposedName]: styleVar },
  ]
}

async function genCustomBlockCode(
  descriptor: SFCDescriptor,
  pluginContext: PluginContext,
) {
  let code = ''
  for (let index = 0; index < descriptor.customBlocks.length; index++) {
    const block = descriptor.customBlocks[index]
    if (block.src) {
      await linkSrcToDescriptor(block.src, descriptor, pluginContext, false)
    }
    const src = block.src || descriptor.filename
    const attrsQuery = attrsToQuery(block.attrs, block.type)
    const srcQuery = block.src ? `&src=true` : ``
    const query = `?vue&type=${block.type}&index=${index}${srcQuery}${attrsQuery}`
    const request = JSON.stringify(src + query)
    code += `import block${index} from ${request}\n`
    code += `if (typeof block${index} === 'function') block${index}(_sfc_main)\n`
  }
  return code
}

/**
 * For blocks with src imports, it is important to link the imported file
 * with its owner SFC descriptor so that we can get the information about
 * the owner SFC when compiling that file in the transform phase.
 */
async function linkSrcToDescriptor(
  src: string,
  descriptor: SFCDescriptor,
  pluginContext: PluginContext,
  scoped?: boolean,
) {
  const srcFile =
    (await pluginContext.resolve(src, descriptor.filename))?.id || src
  // #1812 if the src points to a dep file, the resolved id may contain a
  // version query.
  setSrcDescriptor(srcFile.replace(/\?.*$/, ''), descriptor, scoped)
}

// these are built-in query parameters so should be ignored
// if the user happen to add them as attrs
const ignoreList = [
  'id',
  'index',
  'src',
  'type',
  'lang',
  'module',
  'scoped',
  'generic',
]

function attrsToQuery(
  attrs: SFCBlock['attrs'],
  langFallback?: string,
  forceLangFallback = false,
): string {
  let query = ``
  for (const name in attrs) {
    const value = attrs[name]
    if (!ignoreList.includes(name)) {
      query += `&${encodeURIComponent(name)}${
        value ? `=${encodeURIComponent(value)}` : ``
      }`
    }
  }
  if (langFallback || attrs.lang) {
    query +=
      `lang` in attrs
        ? forceLangFallback
          ? `&lang.${langFallback}`
          : `&lang.${attrs.lang}`
        : `&lang.${langFallback}`
  }
  return query
}
