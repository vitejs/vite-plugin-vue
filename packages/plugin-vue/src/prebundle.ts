import { readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { DepOptimizationOptions, ResolvedConfig, UserConfig } from 'vite'
import { createFilter, normalizePath } from 'vite'
import { transformMain } from './main'
import { EXPORT_HELPER_ID, helperCode } from './helper'
import type { ResolvedOptions } from './index'

type ESBuildPlugin = NonNullable<
  NonNullable<DepOptimizationOptions['esbuildOptions']>['plugins']
>[number]

const FACADE_PLUGIN: ESBuildPlugin = {
  name: 'vite-vue:facade-prebundle',
  setup: () => {},
}

const PLUGIN_NAME = 'vite-vue:prebundle'

export function createOptimizeDeps(
  config: UserConfig,
  options: ResolvedOptions,
): DepOptimizationOptions | undefined {
  if (!options.prebundle) {
    return config.optimizeDeps
  }

  const nextOptimizeDeps = (config.optimizeDeps ||= {})
  const exts = (nextOptimizeDeps.extensions ||= [])
  exts.push('.vue')

  const esbuildOpts = (nextOptimizeDeps.esbuildOptions ||= {})
  const plugins = (esbuildOpts.plugins ||= [])
  plugins.push(FACADE_PLUGIN)

  return nextOptimizeDeps
}

export function patchOptimizeDeps(
  config: ResolvedConfig,
  options: ResolvedOptions,
): void {
  const plugins = config.optimizeDeps.esbuildOptions?.plugins
  if (!Array.isArray(plugins)) return

  const index = plugins.indexOf(FACADE_PLUGIN)
  if (index == null || index < 0) return

  plugins.splice(index, 1, createPrebundlePlugin(options))
}

function createPrebundlePlugin(options: ResolvedOptions): ESBuildPlugin {
  const helperFilter = createHelperFilter()
  const transformFilter = createTransformLoadFilter(options)
  const customElementFilter = createCustomElementFilter(options)

  return {
    name: PLUGIN_NAME,
    setup(build) {
      if (build.initialOptions.plugins?.some((v) => v.name === 'vite:dep-scan'))
        return

      build.onResolve({ filter: helperFilter }, async ({ path: filename }) => {
        if (normalizePath(filename) === EXPORT_HELPER_ID) {
          return { path: filename, namespace: PLUGIN_NAME }
        }
      })

      build.onLoad({ filter: helperFilter }, async ({ path: filename }) => {
        return {
          contents: helperCode,
          resolveDir: dirname(filename),
          loader: 'js',
        }
      })

      build.onLoad(
        { filter: transformFilter.regexp },
        async ({ path: filename }) => {
          if (!transformFilter.guard(filename)) return

          const { errors, warnings, pluginContext } = createFakeContext()
          const resolveDir = dirname(filename)
          const code = readFileSync(filename, 'utf8')
          const asCustomElement = customElementFilter(filename)
          const transformed = await transformMain(
            code,
            filename,
            options,
            pluginContext,
            false,
            asCustomElement,
          )

          return {
            contents: transformed?.code,
            errors,
            warnings,
            resolveDir,
            loader: 'js',
          }
        },
      )
    },
  }
}

function createHelperFilter() {
  return new RegExp(`${EXPORT_HELPER_ID}$`)
}

function createTransformLoadFilter(options: ResolvedOptions) {
  const { include, exclude } = options

  if (include instanceof RegExp) {
    return {
      regexp: include,
      guard: createFilter(undefined, exclude),
    }
  }

  return {
    regexp: /.*/,
    guard: createFilter(include, exclude),
  }
}

function createCustomElementFilter(options: ResolvedOptions) {
  const { customElement } = options

  return typeof customElement === 'boolean'
    ? () => !!customElement
    : createFilter(customElement)
}

function createFakeContext() {
  const errors: { text: string }[] = []
  const warnings: { text: string }[] = []
  const pluginContext = {
    error(message: any) {
      errors.push({ text: String(message) })
    },
    warn(message: any) {
      warnings.push({ text: String(message) })
    },
  } as any

  return {
    errors,
    warnings,
    pluginContext,
  }
}
