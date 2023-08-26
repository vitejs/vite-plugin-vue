import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import type { DepOptimizationOptions, UserConfig } from 'vite'
import { createFilter, normalizePath } from 'vite'
import { transformMain } from './main'
import { EXPORT_HELPER_ID, EXPORT_HELPER_ID_RE, helperCode } from './helper'
import type { ResolvedOptions } from './index'

type ESBuildPlugin = NonNullable<
  NonNullable<DepOptimizationOptions['esbuildOptions']>['plugins']
>[number]

const PLUGIN_NAME = 'vite-vue:prebundle'

export function createOptimizeDeps(
  config: UserConfig,
  options: () => ResolvedOptions,
): DepOptimizationOptions | undefined {
  const opts = options()
  if (!opts.prebundle) {
    return config.optimizeDeps
  }

  const nextOptimizeDeps = (config.optimizeDeps ||= {})
  const exts = (nextOptimizeDeps.extensions ||= [])
  if (!exts.includes('.vue')) {
    exts.push('.vue')
  }

  const esbuildOpts = (nextOptimizeDeps.esbuildOptions ||= {})
  const plugins = (esbuildOpts.plugins ||= [])
  plugins.push(createPrebundlePlugin(options))

  return nextOptimizeDeps
}

function createPrebundlePlugin(options: () => ResolvedOptions): ESBuildPlugin {
  const opts = options()
  const helperFilter = EXPORT_HELPER_ID_RE
  const transformFilter = createTransformLoadFilter(opts)
  const customElementFilter = createCustomElementFilter(opts)

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
          const code = await readFile(filename, 'utf8')
          const asCustomElement = customElementFilter(filename)
          const transformed = await transformMain(
            code,
            filename,
            options(),
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
    ? () => customElement
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
