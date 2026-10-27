import type {
  CompilerOptions,
  SFCDescriptor,
  SFCScriptBlock,
  SFCTemplateCompileOptions,
} from 'vue/compiler-sfc'
import type { Rollup } from 'vite'
import { resolveTemplateCompilerOptions } from './template'
import { cache as descriptorCache } from './utils/descriptorCache'
import { isVaporMode } from './utils/vapor'
import type { ResolvedOptions } from './index'

// ssr and non ssr builds would output different script content
let clientCache = new WeakMap<SFCDescriptor, SFCScriptBlock | null>()
let ssrCache = new WeakMap<SFCDescriptor, SFCScriptBlock | null>()

export const typeDepToSFCMap = new Map<string, Set<string>>()

export function invalidateScript(filename: string): void {
  const desc = descriptorCache.get(filename)
  if (desc) {
    clientCache.delete(desc)
    ssrCache.delete(desc)
  }
}

export function getResolvedScript(
  descriptor: SFCDescriptor,
  ssr: boolean,
): SFCScriptBlock | null | undefined {
  return (ssr ? ssrCache : clientCache).get(descriptor)
}

export function setResolvedScript(
  descriptor: SFCDescriptor,
  script: SFCScriptBlock,
  ssr: boolean,
): void {
  ;(ssr ? ssrCache : clientCache).set(descriptor, script)
}

export function clearScriptCache(): void {
  clientCache = new WeakMap()
  ssrCache = new WeakMap()
}

// Check if we can use compile template as inlined render function
// inside <script setup>. This can only be done for build because
// inlined template cannot be individually hot updated.
export function isUseInlineTemplate(
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
): boolean {
  return (
    !options.devServer &&
    !options.devToolsEnabled &&
    !!descriptor.scriptSetup &&
    !descriptor.template?.src
  )
}

export const scriptIdentifier = `_sfc_main`

export function resolveScript(
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
  ssr: boolean,
  customElement: boolean,
  pluginContext?: Rollup.PluginContext,
): SFCScriptBlock | null {
  if (!descriptor.script && !descriptor.scriptSetup) {
    return null
  }

  const cached = getResolvedScript(descriptor, ssr)
  if (cached) {
    return cached
  }

  const inlineTemplate = isUseInlineTemplate(descriptor, options)
  let templateOptions = resolveTemplateCompilerOptions(
    descriptor,
    options,
    descriptor.filename,
    ssr,
  )
  if (inlineTemplate && templateOptions && pluginContext) {
    templateOptions = withTemplateWarnings(
      templateOptions,
      descriptor,
      options,
      pluginContext,
    )
  }

  const resolved: SFCScriptBlock = options.compiler.compileScript(descriptor, {
    ...options.script,
    id: descriptor.id,
    isProd: options.isProduction,
    inlineTemplate,
    templateOptions,
    sourceMap: options.sourceMap,
    genDefaultAs: canInlineMain(descriptor, options)
      ? scriptIdentifier
      : undefined,
    customElement,
    // @ts-expect-error TODO remove when 3.6 is out
    vapor: !!descriptor.scriptSetup && isVaporMode(descriptor, options),
    propsDestructure:
      options.features?.propsDestructure ?? options.script?.propsDestructure,
  })

  if (!options.isProduction && resolved?.deps) {
    for (const [key, sfcs] of typeDepToSFCMap) {
      if (sfcs.has(descriptor.filename) && !resolved.deps.includes(key)) {
        sfcs.delete(descriptor.filename)
      }
    }

    for (const dep of resolved.deps) {
      const existingSet = typeDepToSFCMap.get(dep)
      if (!existingSet) {
        typeDepToSFCMap.set(dep, new Set([descriptor.filename]))
      } else {
        existingSet.add(descriptor.filename)
      }
    }
  }

  setResolvedScript(descriptor, resolved, ssr)
  return resolved
}

type NodeTransform = NonNullable<CompilerOptions['nodeTransforms']>[number]

// compileScript() does not expose warnings from the inline template compile
function withTemplateWarnings(
  templateOptions: Omit<SFCTemplateCompileOptions, 'source'>,
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
  pluginContext: Rollup.PluginContext,
): Omit<SFCTemplateCompileOptions, 'source'> {
  const forwardWarnings: NodeTransform = (node, context) => {
    if (node !== context.root) return
    const source = context.root.source || descriptor.template!.content
    context.onWarn = (warning) => {
      let message = warning.message
      if (warning.loc) {
        message += `\n${options.compiler.generateCodeFrame(
          source,
          warning.loc.start.offset,
          warning.loc.end.offset,
        )}`
      }
      pluginContext.warn({ id: descriptor.filename, message })
    }
  }
  return {
    ...templateOptions,
    compilerOptions: {
      ...templateOptions.compilerOptions,
      nodeTransforms: [
        forwardWarnings,
        ...(templateOptions.compilerOptions?.nodeTransforms || []),
      ],
    },
  }
}

// If the script is js/ts and has no external src, it can be directly placed
// in the main module. Skip for build
export function canInlineMain(
  descriptor: SFCDescriptor,
  options: ResolvedOptions,
): boolean {
  if (descriptor.script?.src || descriptor.scriptSetup?.src) {
    return false
  }
  const lang = descriptor.script?.lang || descriptor.scriptSetup?.lang
  if (!lang || lang === 'js') {
    return true
  }
  if (lang === 'ts' && options.devServer) {
    return true
  }
  return false
}
