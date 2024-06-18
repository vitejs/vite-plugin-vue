import fs from 'node:fs'
import type { Plugin, ViteDevServer } from 'vite'
import { createFilter } from 'vite'
/* eslint-disable import/no-duplicates */
import type {
  SFCBlock,
  SFCScriptCompileOptions,
  SFCStyleCompileOptions,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc'
import type * as _compiler from 'vue/compiler-sfc'
/* eslint-enable import/no-duplicates */
import { computed, shallowRef } from 'vue'
import { version } from '../package.json'
import { resolveCompiler } from './compiler'
import { parseVueRequest } from './utils/query'
import {
  getDescriptor,
  getSrcDescriptor,
  getTempSrcDescriptor,
} from './utils/descriptorCache'
import { getResolvedScript, typeDepToSFCMap } from './script'
import { transformMain } from './main'
import { handleHotUpdate, handleTypeDepChange } from './handleHotUpdate'
import { transformTemplateAsModule } from './template'
import { transformStyle } from './style'
import { EXPORT_HELPER_ID, helperCode } from './helper'

export { parseVueRequest } from './utils/query'
export type { VueQuery } from './utils/query'

export interface Options {
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]

  /**
   * In Vite, this option follows Vite's config.
   */
  isProduction?: boolean

  // options to pass on to vue/compiler-sfc
  script?: Partial<
    Omit<
      SFCScriptCompileOptions,
      | 'id'
      | 'isProd'
      | 'inlineTemplate'
      | 'templateOptions'
      | 'sourceMap'
      | 'genDefaultAs'
      | 'customElement'
      | 'defineModel'
      | 'propsDestructure'
    >
  > & {
    /**
     * @deprecated defineModel is now a stable feature and always enabled if
     * using Vue 3.4 or above.
     */
    defineModel?: boolean
  }
  template?: Partial<
    Omit<
      SFCTemplateCompileOptions,
      | 'id'
      | 'source'
      | 'ast'
      | 'filename'
      | 'scoped'
      | 'slotted'
      | 'isProd'
      | 'inMap'
      | 'ssr'
      | 'ssrCssVars'
      | 'preprocessLang'
    >
  >
  style?: Partial<
    Omit<
      SFCStyleCompileOptions,
      | 'filename'
      | 'id'
      | 'isProd'
      | 'source'
      | 'scoped'
      | 'cssDevSourcemap'
      | 'postcssOptions'
      | 'map'
      | 'postcssPlugins'
      | 'preprocessCustomRequire'
      | 'preprocessLang'
      | 'preprocessOptions'
    >
  >

  /**
   * Use custom compiler-sfc instance. Can be used to force a specific version.
   */
  compiler?: typeof _compiler

  /**
   * Requires @vitejs/plugin-vue@^5.1.0
   */
  features?: {
    /**
     * Enable reactive destructure for `defineProps`.
     * - Available in Vue 3.4 and later.
     * - **default:** `false` in Vue 3.4 (**experimental**), `true` in Vue 3.5+
     */
    propsDestructure?: boolean
    /**
     * Transform Vue SFCs into custom elements.
     * - `true`: all `*.vue` imports are converted into custom elements
     * - `string | RegExp`: matched files are converted into custom elements
     * - **default:** /\.ce\.vue$/
     */
    customElement?: boolean | string | RegExp | (string | RegExp)[]
    /**
     * Set to `false` to disable Options API support and allow related code in
     * Vue core to be dropped via dead-code elimination in production builds,
     * resulting in smaller bundles.
     * - **default:** `true`
     */
    optionsAPI?: boolean
    /**
     * Set to `true` to enable devtools support in production builds.
     * Results in slightly larger bundles.
     * - **default:** `false`
     */
    prodDevtools?: boolean
    /**
     * Set to `true` to enable detailed information for hydration mismatch
     * errors in production builds. Results in slightly larger bundles.
     * - **default:** `false`
     */
    prodHydrationMismatchDetails?: boolean
  }

  /**
   * @deprecated moved to `features.customElement`.
   */
  customElement?: boolean | string | RegExp | (string | RegExp)[]
}

export interface ResolvedOptions extends Options {
  compiler: typeof _compiler
  root: string
  sourceMap: boolean
  cssDevSourcemap: boolean
  devServer?: ViteDevServer
  devToolsEnabled?: boolean
}

export interface Api {
  get options(): ResolvedOptions
  set options(value: ResolvedOptions)
  version: string
}

export default function vuePlugin(rawOptions: Options = {}): Plugin<Api> {
  const options = shallowRef<ResolvedOptions>({
    isProduction: process.env.NODE_ENV === 'production',
    compiler: null as any, // to be set in buildStart
    include: /\.vue$/,
    customElement: /\.ce\.vue$/,
    ...rawOptions,
    root: process.cwd(),
    sourceMap: true,
    cssDevSourcemap: false,
  })

  const filter = computed(() =>
    createFilter(options.value.include, options.value.exclude),
  )
  const customElementFilter = computed(() => {
    const customElement =
      options.value.features?.customElement || options.value.customElement
    return typeof customElement === 'boolean'
      ? () => customElement
      : createFilter(customElement)
  })

  return {
    name: 'vite:vue',

    api: {
      get options() {
        return options.value
      },
      set options(value) {
        options.value = value
      },
      version,
    },

    handleHotUpdate(ctx) {
      if (options.value.compiler.invalidateTypeCache) {
        options.value.compiler.invalidateTypeCache(ctx.file)
      }
      if (typeDepToSFCMap.has(ctx.file)) {
        return handleTypeDepChange(typeDepToSFCMap.get(ctx.file)!, ctx)
      }
      if (filter.value(ctx.file)) {
        return handleHotUpdate(
          ctx,
          options.value,
          customElementFilter.value(ctx.file),
        )
      }
    },

    config(config) {
      return {
        resolve: {
          dedupe: config.build?.ssr ? [] : ['vue'],
        },
        define: {
          __VUE_OPTIONS_API__:
            (options.value.features?.optionsAPI ||
              config.define?.__VUE_OPTIONS_API__) ??
            true,
          __VUE_PROD_DEVTOOLS__:
            (options.value.features?.prodDevtools ||
              config.define?.__VUE_PROD_DEVTOOLS__) ??
            false,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
            (options.value.features?.prodHydrationMismatchDetails ||
              config.define?.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__) ??
            false,
        },
        ssr: {
          // @ts-ignore -- config.legacy.buildSsrCjsExternalHeuristics will be removed in Vite 5
          external: config.legacy?.buildSsrCjsExternalHeuristics
            ? ['vue', '@vue/server-renderer']
            : [],
        },
      }
    },

    configResolved(config) {
      options.value = {
        ...options.value,
        root: config.root,
        sourceMap: config.command === 'build' ? !!config.build.sourcemap : true,
        cssDevSourcemap: config.css?.devSourcemap ?? false,
        isProduction: config.isProduction,
        devToolsEnabled: !!(
          options.value.features?.prodDevtools ||
          config.define!.__VUE_PROD_DEVTOOLS__ ||
          !config.isProduction
        ),
      }
    },

    configureServer(server) {
      options.value.devServer = server
    },

    buildStart() {
      const compiler = (options.value.compiler =
        options.value.compiler || resolveCompiler(options.value.root))
      if (compiler.invalidateTypeCache) {
        options.value.devServer?.watcher.on('unlink', (file) => {
          compiler.invalidateTypeCache(file)
        })
      }
    },

    async resolveId(id) {
      // component export helper
      if (id === EXPORT_HELPER_ID) {
        return id
      }
      // serve sub-part requests (*?vue) as virtual modules
      if (parseVueRequest(id).query.vue) {
        return id
      }
    },

    load(id, opt) {
      const ssr = opt?.ssr === true
      if (id === EXPORT_HELPER_ID) {
        return helperCode
      }

      const { filename, query } = parseVueRequest(id)

      // select corresponding block for sub-part virtual modules
      if (query.vue) {
        if (query.src) {
          return fs.readFileSync(filename, 'utf-8')
        }
        const descriptor = getDescriptor(filename, options.value)!
        let block: SFCBlock | null | undefined
        if (query.type === 'script') {
          // handle <script> + <script setup> merge via compileScript()
          block = getResolvedScript(descriptor, ssr)
        } else if (query.type === 'template') {
          block = descriptor.template!
        } else if (query.type === 'style') {
          block = descriptor.styles[query.index!]
        } else if (query.index != null) {
          block = descriptor.customBlocks[query.index]
        }
        if (block) {
          return {
            code: block.content,
            map: block.map as any,
          }
        }
      }
    },

    transform(code, id, opt) {
      const ssr = opt?.ssr === true
      const { filename, query } = parseVueRequest(id)

      if (query.raw || query.url) {
        return
      }

      if (!filter.value(filename) && !query.vue) {
        return
      }

      if (!query.vue) {
        // main request
        return transformMain(
          code,
          filename,
          options.value,
          this,
          ssr,
          customElementFilter.value(filename),
        )
      } else {
        // sub block request
        const descriptor = query.src
          ? getSrcDescriptor(filename, query) ||
            getTempSrcDescriptor(filename, query)
          : getDescriptor(filename, options.value)!

        if (query.type === 'template') {
          return transformTemplateAsModule(
            code,
            descriptor,
            options.value,
            this,
            ssr,
            customElementFilter.value(filename),
          )
        } else if (query.type === 'style') {
          return transformStyle(
            code,
            descriptor,
            Number(query.index || 0),
            options.value,
            this,
            filename,
          )
        }
      }
    },
  }
}
