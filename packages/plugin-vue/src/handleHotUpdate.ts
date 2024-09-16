import _debug from 'debug'
import type { SFCBlock, SFCDescriptor } from 'vue/compiler-sfc'
import type { HmrContext, ModuleNode } from 'vite'
import { isCSSRequest } from 'vite'

// eslint-disable-next-line n/no-extraneous-import
import type * as t from '@babel/types'

import {
  cache,
  createDescriptor,
  getDescriptor,
  invalidateDescriptor,
} from './utils/descriptorCache'
import {
  getResolvedScript,
  invalidateScript,
  resolveScript,
  setResolvedScript,
} from './script'
import type { ResolvedOptions } from './index'

const debug = _debug('vite:hmr')

const directRequestRE = /(?:\?|&)direct\b/

/**
 * Vite-specific HMR handling
 */
export async function handleHotUpdate(
  { file, modules, read }: HmrContext,
  options: ResolvedOptions,
  customElement: boolean,
): Promise<ModuleNode[] | void> {
  const prevDescriptor = getDescriptor(file, options, false, true)
  if (!prevDescriptor) {
    // file hasn't been requested yet (e.g. async component)
    return
  }

  const content = await read()
  const { descriptor } = createDescriptor(file, content, options, true)

  let needRerender = false
  const affectedModules = new Set<ModuleNode | undefined>()
  const mainModule = getMainModule(modules)
  const templateModule = modules.find((m) => /type=template/.test(m.url))

  // trigger resolveScript for descriptor so that we'll have the AST ready
  resolveScript(descriptor, options, false, customElement)
  const scriptChanged = hasScriptChanged(prevDescriptor, descriptor)
  if (scriptChanged) {
    affectedModules.add(getScriptModule(modules) || mainModule)
  }

  if (!isEqualBlock(descriptor.template, prevDescriptor.template)) {
    // when a <script setup> component's template changes, it will need correct
    // binding metadata. However, when reloading the template alone the binding
    // metadata will not be available since the script part isn't loaded.
    // in this case, reuse the compiled script from previous descriptor.
    if (!scriptChanged) {
      setResolvedScript(
        descriptor,
        getResolvedScript(prevDescriptor, false)!,
        false,
      )
    }
    affectedModules.add(templateModule)
    needRerender = true
  }

  let didUpdateStyle = false
  const prevStyles = prevDescriptor.styles || []
  const nextStyles = descriptor.styles || []

  // force reload if CSS vars injection changed
  if (prevDescriptor.cssVars.join('') !== descriptor.cssVars.join('')) {
    affectedModules.add(mainModule)
  }

  // force reload if scoped status has changed
  if (prevStyles.some((s) => s.scoped) !== nextStyles.some((s) => s.scoped)) {
    // template needs to be invalidated as well
    affectedModules.add(templateModule)
    affectedModules.add(mainModule)
  }

  // only need to update styles if not reloading, since reload forces
  // style updates as well.
  for (let i = 0; i < nextStyles.length; i++) {
    const prev = prevStyles[i]
    const next = nextStyles[i]
    if (!prev || !isEqualBlock(prev, next)) {
      didUpdateStyle = true
      const mod = modules.find(
        (m) =>
          m.url.includes(`type=style&index=${i}`) &&
          m.url.endsWith(`.${next.lang || 'css'}`) &&
          !directRequestRE.test(m.url),
      )
      if (mod) {
        affectedModules.add(mod)
        if (mod.url.includes('&inline')) {
          affectedModules.add(mainModule)
        }
      } else {
        // new style block - force reload
        affectedModules.add(mainModule)
      }
    }
  }
  if (prevStyles.length > nextStyles.length) {
    // style block removed - force reload
    affectedModules.add(mainModule)
  }

  const prevCustoms = prevDescriptor.customBlocks || []
  const nextCustoms = descriptor.customBlocks || []

  // custom blocks update causes a reload
  // because the custom block contents is changed and it may be used in JS.
  if (prevCustoms.length !== nextCustoms.length) {
    // block removed/added, force reload
    affectedModules.add(mainModule)
  } else {
    for (let i = 0; i < nextCustoms.length; i++) {
      const prev = prevCustoms[i]
      const next = nextCustoms[i]
      if (!prev || !isEqualBlock(prev, next)) {
        const mod = modules.find((m) =>
          m.url.includes(`type=${prev.type}&index=${i}`),
        )
        if (mod) {
          affectedModules.add(mod)
        } else {
          affectedModules.add(mainModule)
        }
      }
    }
  }

  const updateType = []
  if (needRerender) {
    updateType.push(`template`)
    // template is inlined into main, add main module instead
    if (!templateModule) {
      affectedModules.add(mainModule)
    } else if (mainModule && !affectedModules.has(mainModule)) {
      const styleImporters = [...mainModule.importers].filter((m) =>
        isCSSRequest(m.url),
      )
      styleImporters.forEach((m) => affectedModules.add(m))
    }
  }
  if (didUpdateStyle) {
    updateType.push(`style`)
  }
  if (updateType.length) {
    if (file.endsWith('.vue')) {
      // invalidate the descriptor cache so that the next transform will
      // re-analyze the file and pick up the changes.
      invalidateDescriptor(file)
    } else {
      // https://github.com/vuejs/vitepress/issues/3129
      // For non-vue files, e.g. .md files in VitePress, invalidating the
      // descriptor will cause the main `load()` hook to attempt to read and
      // parse a descriptor from a non-vue source file, leading to errors.
      // To fix that we need to provide the descriptor we parsed here in the
      // main cache. This assumes no other plugin is applying pre-transform to
      // the file type - not impossible, but should be extremely unlikely.
      cache.set(file, descriptor)
    }
    debug(`[vue:update(${updateType.join('&')})] ${file}`)
  }
  return [...affectedModules].filter(Boolean) as ModuleNode[]
}

export function isEqualBlock(a: SFCBlock | null, b: SFCBlock | null): boolean {
  if (!a && !b) return true
  if (!a || !b) return false
  // src imports will trigger their own updates
  if (a.src && b.src && a.src === b.src) return true
  if (a.content !== b.content) return false
  const keysA = Object.keys(a.attrs)
  const keysB = Object.keys(b.attrs)
  if (keysA.length !== keysB.length) {
    return false
  }
  return keysA.every((key) => a.attrs[key] === b.attrs[key])
}

export function isOnlyTemplateChanged(
  prev: SFCDescriptor,
  next: SFCDescriptor,
): boolean {
  return (
    !hasScriptChanged(prev, next) &&
    prev.styles.length === next.styles.length &&
    prev.styles.every((s, i) => isEqualBlock(s, next.styles[i])) &&
    prev.customBlocks.length === next.customBlocks.length &&
    prev.customBlocks.every((s, i) => isEqualBlock(s, next.customBlocks[i]))
  )
}

function deepEqual(
  obj1: any,
  obj2: any,
  excludeProps: string[] = [],
  deepParentsOfObj1: any[] = [],
): boolean {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // Check if both objects are primitive types or null
  // or circular reference
  if (
    obj1 == null ||
    obj2 == null ||
    typeof obj1 !== 'object' ||
    deepParentsOfObj1.includes(obj1)
  ) {
    return obj1 === obj2
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false
  }

  // Iterate through the keys and recursively compare the values
  for (const key of keys1) {
    // Check if the current key should be excluded
    if (excludeProps.includes(key)) {
      continue
    }

    if (
      !deepEqual(obj1[key], obj2[key], excludeProps, [
        ...deepParentsOfObj1,
        obj1,
      ])
    ) {
      return false
    }
  }

  // If all comparisons passed, the objects are deep equal
  return true
}

function isEqualAst(prev?: t.Statement[], next?: t.Statement[]): boolean {
  if (typeof prev === 'undefined' || typeof next === 'undefined') {
    return prev === next
  }

  if (prev.length !== next.length) {
    return false
  }

  for (let i = 0; i < prev.length; i++) {
    const prevNode = prev[i]
    const nextNode = next[i]
    if (
      // deep equal, but ignore start/end/loc/range/leadingComments/trailingComments/innerComments
      !deepEqual(prevNode, nextNode, [
        'start',
        'end',
        'loc',
        'range',
        'leadingComments',
        'trailingComments',
        'innerComments',
        // https://github.com/vuejs/core/issues/11923
        // avoid comparing the following properties of typeParameters
        // as it may be imported from 3rd lib and complex to compare
        '_ownerScope',
        '_resolvedReference',
        '_resolvedElements',
      ])
    ) {
      return false
    }
  }

  return true
}

function hasScriptChanged(prev: SFCDescriptor, next: SFCDescriptor): boolean {
  // check for scriptAst/scriptSetupAst changes
  // note that the next ast is not available yet, so we need to trigger parsing
  const prevScript = getResolvedScript(prev, false)
  const nextScript = getResolvedScript(next, false)

  if (
    !isEqualBlock(prev.script, next.script) &&
    !isEqualAst(prevScript?.scriptAst, nextScript?.scriptAst)
  ) {
    return true
  }
  if (
    !isEqualBlock(prev.scriptSetup, next.scriptSetup) &&
    !isEqualAst(prevScript?.scriptSetupAst, nextScript?.scriptSetupAst)
  ) {
    return true
  }

  // vue core #3176
  // <script setup lang="ts"> prunes non-unused imports
  // the imports pruning depends on template, so script may need to re-compile
  // based on template changes
  const prevResolvedScript = getResolvedScript(prev, false)
  // this is only available in vue@^3.2.23
  const prevImports = prevResolvedScript?.imports
  if (prevImports) {
    return !next.template || next.shouldForceReload(prevImports)
  }

  return false
}

function getMainModule(modules: ModuleNode[]) {
  return (
    modules
      .filter((m) => !/type=/.test(m.url) || /type=script/.test(m.url))
      // #9341
      // We pick the module with the shortest URL in order to pick the module
      // with the lowest number of query parameters.
      .sort((m1, m2) => {
        return m1.url.length - m2.url.length
      })[0]
  )
}

function getScriptModule(modules: ModuleNode[]) {
  return modules.find((m) => /type=script.*&lang\.\w+$/.test(m.url))
}

export function handleTypeDepChange(
  affectedComponents: Set<string>,
  { modules, server: { moduleGraph } }: HmrContext,
): ModuleNode[] {
  const affected = new Set<ModuleNode>()
  for (const file of affectedComponents) {
    invalidateScript(file)
    const mods = moduleGraph.getModulesByFile(file)
    if (mods) {
      const arr = [...mods]
      affected.add(getScriptModule(arr) || getMainModule(arr))
    }
  }
  return [...modules, ...affected]
}
