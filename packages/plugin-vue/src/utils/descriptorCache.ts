import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import type { CompilerError, SFCDescriptor } from 'vue/compiler-sfc'
import { normalizePath } from 'vite'
import type { ResolvedOptions, VueQuery } from '..'

// compiler-sfc should be exported so it can be re-used
export interface SFCParseResult {
  descriptor: SFCDescriptor
  errors: (CompilerError | SyntaxError)[]
}

export const cache = new Map<string, SFCDescriptor>()
// we use a separate descriptor cache for HMR purposes.
// The main cached descriptors are parsed from SFCs that may have been
// transformed by other plugins, e.g. vue-macros;
// The HMR cached descriptors are based on the raw, pre-transform SFCs.
export const hmrCache = new Map<string, SFCDescriptor>()
const prevCache = new Map<string, SFCDescriptor | undefined>()

export function createDescriptor(
  filename: string,
  source: string,
  { root, isProduction, sourceMap, compiler, template }: ResolvedOptions,
  hmr = false,
): SFCParseResult {
  const { descriptor, errors } = compiler.parse(source, {
    filename,
    sourceMap,
    templateParseOptions: template?.compilerOptions,
  })

  // ensure the path is normalized in a way that is consistent inside
  // project (relative to root) and on different systems.
  const normalizedPath = normalizePath(path.relative(root, filename))
  descriptor.id = getHash(normalizedPath + (isProduction ? source : ''))
  ;(hmr ? hmrCache : cache).set(filename, descriptor)
  return { descriptor, errors }
}

export function getPrevDescriptor(filename: string): SFCDescriptor | undefined {
  return prevCache.get(filename)
}

export function invalidateDescriptor(filename: string, hmr = false): void {
  const _cache = hmr ? hmrCache : cache
  const prev = _cache.get(filename)
  _cache.delete(filename)
  if (prev) {
    prevCache.set(filename, prev)
  }
}

export function getDescriptor(
  filename: string,
  options: ResolvedOptions,
  createIfNotFound = true,
  hmr = false,
  code?: string,
): SFCDescriptor | undefined {
  const _cache = hmr ? hmrCache : cache
  if (_cache.has(filename)) {
    return _cache.get(filename)!
  }
  if (createIfNotFound) {
    const { descriptor, errors } = createDescriptor(
      filename,
      code ?? fs.readFileSync(filename, 'utf-8'),
      options,
      hmr,
    )
    if (errors.length && !hmr) {
      throw errors[0]
    }
    return descriptor
  }
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
): SFCDescriptor {
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
      },
    ],
  } as SFCDescriptor
}

export function setSrcDescriptor(
  filename: string,
  entry: SFCDescriptor,
  scoped?: boolean,
): void {
  if (scoped) {
    // if multiple Vue files use the same src file, they will be overwritten
    // should use other key
    cache.set(`${filename}?src=${entry.id}`, entry)
    return
  }
  cache.set(filename, entry)
}

function getHash(text: string): string {
  return createHash('sha256').update(text).digest('hex').substring(0, 8)
}
