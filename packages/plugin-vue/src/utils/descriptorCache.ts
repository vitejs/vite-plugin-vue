import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { CompilerError, SFCDescriptor } from 'vue/compiler-sfc'
import { normalizePath } from 'vite'
import type { ResolvedOptions, VueQuery } from '../index'

// compiler-sfc should be exported so it can be re-used
export interface SFCParseResult {
  descriptor: SFCDescriptor
  errors: (CompilerError | SyntaxError)[]
}

// Descriptor caches are keyed by `(filename, ssr)` so that SSR and client
// transforms operate on distinct descriptor objects. `compileScript` mutates
// the descriptor with ssr-specific state, so sharing one descriptor between
// an ssr pass and a subsequent client pass produces incorrect output
// (e.g. `<script setup>` imports that are only referenced from the template
// get dropped from `__returned__`).
export const cache = new Map<string, SFCDescriptor>()
// we use a separate descriptor cache for HMR purposes.
// The main cached descriptors are parsed from SFCs that may have been
// transformed by other plugins, e.g. vue-macros;
// The HMR cached descriptors are based on the raw, pre-transform SFCs.
// HMR is client-only, but we still namespace the key for consistency.
export const hmrCache = new Map<string, SFCDescriptor>()
// `prevCache` is consulted for HMR diffing, which is client-only.
const prevCache = new Map<string, SFCDescriptor | undefined>()

function getCacheKey(filename: string, ssr: boolean): string {
  return `${filename}\0${ssr ? 'ssr' : 'client'}`
}

export function createDescriptor(
  filename: string,
  source: string,
  {
    root,
    isProduction,
    sourceMap,
    compiler,
    template,
    features,
  }: ResolvedOptions,
  hmr = false,
  ssr = false,
): SFCParseResult {
  const parseResult = compiler.parse(source, {
    filename,
    sourceMap,
    templateParseOptions: template?.compilerOptions,
  })
  // `compiler.parse` is backed by an internal LRU cache keyed by the source
  // (and other parse options). Two parses of the same SFC therefore return
  // the **same** descriptor object. Because `compileScript` mutates the
  // descriptor (and its script/scriptSetup blocks) with ssr-specific compiled
  // state, reusing that shared object across ssr and client transforms would
  // poison the second transform. Clone the descriptor so each cache entry
  // owns an independent object that `compileScript` is free to mutate.
  const descriptor = cloneDescriptor(parseResult.descriptor)
  const { errors } = parseResult

  // ensure the path is normalized in a way that is consistent inside
  // project (relative to root) and on different systems.
  const normalizedPath = normalizePath(path.relative(root, filename))

  const componentIdGenerator = features?.componentIdGenerator
  if (componentIdGenerator === 'filepath') {
    descriptor.id = getHash(normalizedPath)
  } else if (componentIdGenerator === 'filepath-source') {
    descriptor.id = getHash(normalizedPath + source)
  } else if (typeof componentIdGenerator === 'function') {
    descriptor.id = componentIdGenerator(
      normalizedPath,
      source,
      isProduction,
      getHash,
    )
  } else {
    descriptor.id = getHash(normalizedPath + (isProduction ? source : ''))
  }

  ;(hmr ? hmrCache : cache).set(getCacheKey(filename, ssr), descriptor)
  return { descriptor, errors }
}

export function getPrevDescriptor(filename: string): SFCDescriptor | undefined {
  return prevCache.get(filename)
}

export function invalidateDescriptor(
  filename: string,
  hmr = false,
  ssr = false,
): void {
  const _cache = hmr ? hmrCache : cache
  const key = getCacheKey(filename, ssr)
  const prev = _cache.get(key)
  _cache.delete(key)
  if (prev) {
    prevCache.set(filename, prev)
  }
}

export interface ExtendedSFCDescriptor extends SFCDescriptor {
  isTemp?: boolean
}

export function getDescriptor(
  filename: string,
  options: ResolvedOptions,
  createIfNotFound = true,
  hmr = false,
  code?: string,
  ssr = false,
): SFCDescriptor | undefined {
  const _cache = hmr ? hmrCache : cache
  const key = getCacheKey(filename, ssr)
  if (_cache.has(key)) {
    return _cache.get(key)!
  }
  if (createIfNotFound) {
    const { descriptor, errors } = createDescriptor(
      filename,
      code ?? fs.readFileSync(filename, 'utf-8'),
      options,
      hmr,
      ssr,
    )
    if (errors.length && !hmr) {
      throw errors[0]
    }
    return descriptor
  }
}

export function setCachedDescriptor(
  filename: string,
  descriptor: SFCDescriptor,
  ssr = false,
): void {
  cache.set(getCacheKey(filename, ssr), descriptor)
}

export function peekCachedDescriptor(
  filename: string,
  ssr = false,
): SFCDescriptor | undefined {
  return cache.get(getCacheKey(filename, ssr))
}

export function getSrcDescriptor(
  filename: string,
  query: VueQuery,
): SFCDescriptor {
  if (query.scoped) {
    return cache.get(`${filename}?src=${query.src}`)!
  }
  return cache.get(filename)!
}

export function getTempSrcDescriptor(
  filename: string,
  query: VueQuery,
): ExtendedSFCDescriptor {
  // this is only used for pre-compiled <style src> with scoped flag
  return {
    filename,
    id: query.id || '',
    styles: [
      {
        scoped: query.scoped,
        loc: {
          start: { line: 0, column: 0 },
        },
      } as any,
    ],
    isTemp: true,
  } as ExtendedSFCDescriptor
}

export function setSrcDescriptor(
  filename: string,
  entry: SFCDescriptor,
  scoped?: boolean,
): void {
  // `?src=` descriptors are only consumed by the style transform (via
  // `getSrcDescriptor`), which never calls `compileScript`. They are safe to
  // key by filename alone.
  if (scoped) {
    // if multiple Vue files use the same src file, they will be overwritten
    // should use other key
    cache.set(`${filename}?src=${entry.id}`, entry)
    return
  }
  cache.set(filename, entry)
}

function getHash(text: string): string {
  return crypto.hash('sha256', text, 'hex').substring(0, 8)
}

function cloneDescriptor(descriptor: SFCDescriptor): SFCDescriptor {
  return {
    ...descriptor,
    script: descriptor.script ? { ...descriptor.script } : null,
    scriptSetup: descriptor.scriptSetup ? { ...descriptor.scriptSetup } : null,
    template: descriptor.template ? { ...descriptor.template } : null,
    styles: descriptor.styles.map((s) => ({ ...s })),
    customBlocks: descriptor.customBlocks.map((b) => ({ ...b })),
  }
}
