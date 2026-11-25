import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { CompilerError, SFCDescriptor } from 'vue/compiler-sfc'
import type { RawSourceMap } from 'source-map-js'
import type { EncodedSourceMap as TraceEncodedSourceMap } from '@jridgewell/trace-mapping'
import {
  TraceMap,
  eachMapping,
  originalPositionFor,
} from '@jridgewell/trace-mapping'
import type { EncodedSourceMap as GenEncodedSourceMap } from '@jridgewell/gen-mapping'
import {
  GenMapping,
  addMapping,
  setSourceContent,
  toEncodedMap,
} from '@jridgewell/gen-mapping'
import { normalizePath } from 'vite'
import type { ResolvedOptions, VueQuery } from '../index'

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
  {
    root,
    isProduction,
    sourceMap,
    compiler,
    template,
    features,
  }: ResolvedOptions,
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

export interface ExtendedSFCDescriptor extends SFCDescriptor {
  isTemp?: boolean
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

// When plugins before this one (e.g. `enforce: 'pre'`) changed an SFC, its
// block maps point at the changed code. This holds the map from that code back
// to the sources the bundler loaded, so sub-block requests can be remapped.
interface PreTransform {
  map: TraceMap
  contents: Map<string, string>
}

const preTransforms = new WeakMap<SFCDescriptor, PreTransform>()

export function trackPreTransform(
  descriptor: SFCDescriptor,
  code: string,
  rawSource: string | undefined,
  getCombinedMap: () => TraceEncodedSourceMap,
): void {
  preTransforms.delete(descriptor)
  if (rawSource === code) return

  const map = new TraceMap(getCombinedMap())
  const filename = normalizePath(descriptor.filename)
  const contents = new Map<string, string>()
  map.resolvedSources.forEach((source, i) => {
    const content =
      map.sourcesContent?.[i] ??
      (normalizePath(source) === filename ? rawSource : undefined)
    if (content != null) contents.set(source, content)
  })
  const original = [...contents].find(
    ([source]) => normalizePath(source) === filename,
  )?.[1]
  if (original == null || original === code) return

  preTransforms.set(descriptor, { map, contents })
}

export function remapBlockToRawSource(
  descriptor: SFCDescriptor,
  blockMap: RawSourceMap | undefined,
): RawSourceMap | undefined {
  const pre = preTransforms.get(descriptor)
  if (!pre || !blockMap) return blockMap

  const gen = new GenMapping({ file: blockMap.file })
  const used = new Set<string>()
  eachMapping(
    new TraceMap(
      blockMap as Omit<RawSourceMap, 'version'> as TraceEncodedSourceMap,
    ),
    (m) => {
      if (m.originalLine == null) return
      const original = originalPositionFor(pre.map, {
        line: m.originalLine,
        column: m.originalColumn,
      })
      if (original.source == null) return
      used.add(original.source)
      addMapping(gen, {
        source: original.source,
        original: { line: original.line, column: original.column },
        generated: { line: m.generatedLine, column: m.generatedColumn },
      })
    },
  )
  for (const source of used) {
    const content = pre.contents.get(source)
    if (content != null) setSourceContent(gen, source, content)
  }
  return toEncodedMap(gen) as Omit<
    GenEncodedSourceMap,
    'version'
  > as RawSourceMap
}
