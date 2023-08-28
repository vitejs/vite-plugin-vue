import { dirname, extname } from 'node:path'
import { readFile } from 'node:fs/promises'
import type {
  LoadResult,
  ResolveIdResult,
  TransformPluginContext,
  TransformResult,
} from 'rollup'
import type { DepOptimizationOptions, UserConfig } from 'vite'
import type { ResolvedOptions } from './index'

export type SharedHooks = {
  buildStart: () => void
  resolveId: (id: string) => Promise<ResolveIdResult> | ResolveIdResult
  load: (
    id: string,
    opt?: { ssr?: boolean },
  ) => Promise<LoadResult> | LoadResult
  transform: (
    pluginContext: TransformPluginContext,
    code: string,
    id: string,
    opt?: { ssr?: boolean },
  ) => Promise<TransformResult> | TransformResult
}

type ESBuildPlugin = NonNullable<
  NonNullable<DepOptimizationOptions['esbuildOptions']>['plugins']
>[number]

const PLUGIN_NAME = 'vite-vue:prebundle'

export function createOptimizeDeps(
  config: UserConfig,
  options: ResolvedOptions,
  hooks: SharedHooks,
): DepOptimizationOptions | undefined {
  if (!options.prebundle) {
    return config.optimizeDeps
  }

  const nextOptimizeDeps = (config.optimizeDeps ||= {})
  const exts = (nextOptimizeDeps.extensions ||= [])
  if (!exts.includes('.vue')) {
    exts.push('.vue')
  }

  const esbuildOpts = (nextOptimizeDeps.esbuildOptions ||= {})
  const plugins = (esbuildOpts.plugins ||= [])
  plugins.push(createPrebundlePlugin(hooks))

  return nextOptimizeDeps
}

function createPrebundlePlugin(hooks: SharedHooks): ESBuildPlugin {
  return {
    name: PLUGIN_NAME,
    setup(build) {
      if (build.initialOptions.plugins?.some((v) => v.name === 'vite:dep-scan'))
        return

      build.onStart(() => {
        hooks.buildStart()
      })

      build.onResolve({ filter: /.*/ }, async ({ path: id }) => {
        const resolveId = await hooks.resolveId(id)
        if (!resolveId) {
          return
        }

        return {
          path: id,
          namespace: PLUGIN_NAME,
        }
      })

      build.onLoad({ filter: /.*/ }, async ({ path, suffix }) => {
        const id = path + suffix
        const resolveDir = dirname(path)
        const { errors, warnings, pluginContext } = createFakeContext()

        let code: string | undefined

        const loadResult = await hooks.load(id)
        if (loadResult) {
          if (typeof loadResult === 'string') {
            code = loadResult
          } else if (typeof loadResult === 'object') {
            code = loadResult.code!
          }
        }

        if (!code) {
          code = await readFile(path, 'utf8')
        }

        const transformResult = await hooks.transform(pluginContext, code, id)
        if (transformResult) {
          if (typeof transformResult === 'string') {
            code = transformResult
          } else if (typeof transformResult === 'object') {
            code = transformResult.code
          }
        }

        if (code) {
          return {
            contents: code,
            errors,
            warnings,
            loader: guessLoader(path),
            resolveDir,
          }
        }
      })
    },
  }
}

const ExtToLoader = {
  '.js': 'js',
  '.mjs': 'js',
  '.cjs': 'js',
  '.jsx': 'jsx',
  '.ts': 'ts',
  '.cts': 'ts',
  '.mts': 'ts',
  '.tsx': 'tsx',
} as const

function guessLoader(id: string) {
  return (
    ExtToLoader[extname(id).toLowerCase() as keyof typeof ExtToLoader] || 'js'
  )
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
