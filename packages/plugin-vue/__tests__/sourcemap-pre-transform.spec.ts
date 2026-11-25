import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  addMapping,
  fromMap,
  setSourceContent,
  toEncodedMap,
} from '@jridgewell/gen-mapping'
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'
import MagicString, { Bundle } from 'magic-string'
import { afterEach, expect, it } from 'vitest'
import { type Plugin, type Rolldown, build, createServer } from 'vite'
import vue from '../src/index'

const SFC = `<template>
  <p>before</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'scriptMarker' })
</script>
`

let root: string

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

function createApp(app: string | null = SFC): void {
  root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-sourcemap-')),
  )
  fs.writeFileSync(
    path.join(root, 'main.js'),
    "import App from './App.vue'\nconsole.log(App)\n",
  )
  if (app != null) fs.writeFileSync(path.join(root, 'App.vue'), app)
}

function rewrite(from: string, to: string, includeContent = true): Plugin {
  return {
    name: 'rewrite',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('App.vue') || !code.includes(from)) return
      const s = new MagicString(code)
      s.replace(from, to)
      return {
        code: s.toString(),
        map: s.generateMap({ source: id, includeContent, hires: true }),
      }
    },
  }
}

const buildOptions = {
  sourcemap: true,
  minify: false,
  rolldownOptions: {
    input: 'main.js',
    external: ['vue'],
  },
} as const

async function buildChunk(plugins: Plugin[]) {
  const output = (await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [...plugins, vue()],
    build: { ...buildOptions, write: false },
  })) as Rolldown.RolldownOutput
  return output.output[0]
}

function contentsOf(
  map: { sources: string[]; sourcesContent?: (string | null)[] },
  file: string,
): (string | null | undefined)[] {
  return map.sources.flatMap((source, i) =>
    source.endsWith(file) ? [map.sourcesContent?.[i]] : [],
  )
}

function traceToken(code: string, map: any, token: string) {
  const index = code.indexOf(token)
  expect(index).toBeGreaterThan(-1)
  const before = code.slice(0, index)
  const line = before.split('\n').length
  const column = index - before.lastIndexOf('\n') - 1
  return originalPositionFor(new TraceMap(map), { line, column })
}

function expectOriginalAt(
  position: {
    source: string | null
    line: number | null
    column: number | null
  },
  file: string,
  text: string,
  token: string,
): void {
  expect(position.source).toMatch(new RegExp(`${file}$`))
  const line = text.split('\n')[position.line! - 1]
  expect(line.slice(position.column!)).toMatch(new RegExp(`^'?${token}`))
}

it('build maps a separate script block to the original file after a pre transform', async () => {
  createApp()
  const chunk = await buildChunk([rewrite('before', 'after\n\n')])

  expect(new Set(contentsOf(chunk.map!, 'App.vue'))).toEqual(new Set([SFC]))
  expectOriginalAt(
    traceToken(chunk.code, chunk.map, 'scriptMarker'),
    'App.vue',
    SFC,
    'scriptMarker',
  )
})

it('build maps an sfc that a load hook supplies', async () => {
  createApp(null)
  const app = path.join(root, 'App.vue')
  const chunk = await buildChunk([
    {
      name: 'virtual-sfc',
      enforce: 'pre',
      resolveId: (id) => (id === './App.vue' ? app : undefined),
      load: (id) => (id === app ? SFC : undefined),
    },
    rewrite('before', 'after\n\n'),
  ])

  expect(new Set(contentsOf(chunk.map!, 'App.vue'))).toEqual(new Set([SFC]))
})

it('build keeps the file content when the pre map lists another source first', async () => {
  createApp()
  const chunk = await buildChunk([
    {
      name: 'prepend-header',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('App.vue')) return
        const bundle = new Bundle()
        bundle.addSource({
          filename: path.join(root, 'header.html'),
          content: new MagicString('<!-- header -->\n'),
        })
        bundle.addSource({ filename: id, content: new MagicString(code) })
        return {
          code: bundle.toString(),
          map: bundle.generateMap({ hires: true, includeContent: true }),
        }
      },
    },
  ])

  expect(new Set(contentsOf(chunk.map!, 'App.vue'))).toEqual(new Set([SFC]))
  expectOriginalAt(
    traceToken(chunk.code, chunk.map, 'scriptMarker'),
    'App.vue',
    SFC,
    'scriptMarker',
  )
})

it('build keeps code that the pre map attributes to another file on that file', async () => {
  createApp()
  const snippet = 'console.log("injectedMarker")\n'
  const chunk = await buildChunk([
    {
      name: 'inject-snippet',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('App.vue')) return
        const s = new MagicString(code)
        s.appendLeft(code.indexOf('</script>'), snippet)
        const gen = fromMap(
          s.generateMap({ source: id, includeContent: true, hires: true }),
        )
        const source = path.join(root, 'snippet.ts')
        setSourceContent(gen, source, snippet)
        const line =
          s
            .toString()
            .split('\n')
            .findIndex((l) => l.includes('injected')) + 1
        for (let column = 0; column < snippet.length - 1; column++) {
          addMapping(gen, {
            generated: { line, column },
            source,
            original: { line: 1, column },
          })
        }
        return { code: s.toString(), map: toEncodedMap(gen) }
      },
    },
  ])

  expect(new Set(contentsOf(chunk.map!, 'App.vue'))).toEqual(new Set([SFC]))
  const position = traceToken(
    chunk.code,
    chunk.map,
    'console.log("injectedMarker")',
  )
  expect(position.source).toMatch(/snippet\.ts$/)
  expect(position.line).toBe(1)
  expect(new Set(contentsOf(chunk.map!, 'snippet.ts'))).toEqual(
    new Set([snippet]),
  )
})

async function devScriptModule(plugins: Plugin[]) {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [
      {
        name: 'stub-vue',
        resolveId: (id) => (id === 'vue' ? '\0vue' : undefined),
        load: (id) =>
          id === '\0vue'
            ? 'export const defineComponent = (o) => o'
            : undefined,
      },
      ...plugins,
      vue(),
    ],
    server: { middlewareMode: true, ws: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  try {
    await server.transformRequest('/App.vue')
    return (await server.transformRequest('/App.vue?vue&type=script&lang.ts'))!
  } finally {
    await server.close()
  }
}

it('dev server maps the script block when the pre map has no sourcesContent', async () => {
  createApp()
  const plain = await devScriptModule([])
  const result = await devScriptModule([rewrite('before', 'after\n\n', false)])

  expect(contentsOf(result.map as any, 'App.vue')).toEqual([SFC])
  expect(traceToken(result.code, result.map, 'scriptMarker')).toEqual(
    traceToken(plain.code, plain.map, 'scriptMarker'),
  )
})

async function watchBuilds(
  plugins: Plugin[],
  afterFirstBuild: () => void,
): Promise<(string | null | undefined)[][]> {
  const watcher = (await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [...plugins, vue()],
    build: { ...buildOptions, watch: {} },
  })) as Rolldown.RolldownWatcher

  const contents: (string | null | undefined)[][] = []
  await new Promise<void>((resolve, reject) => {
    watcher.on('event', (event) => {
      if (event.code === 'BUNDLE_END') event.result.close()
      if (event.code === 'ERROR') reject(event.error)
      if (event.code !== 'END') return
      const assets = path.join(root, 'dist/assets')
      const file = fs.readdirSync(assets).find((f) => f.endsWith('.js.map'))!
      const map = JSON.parse(fs.readFileSync(path.join(assets, file), 'utf-8'))
      contents.push(contentsOf(map, 'App.vue'))
      if (contents.length === 1) afterFirstBuild()
      else resolve()
    })
  }).finally(() => watcher.close())
  return contents
}

it('watch rebuild maps an edited sfc to its new content', async () => {
  createApp()
  const app = path.join(root, 'App.vue')
  const edited = SFC.replace('before', 'edited')
  const contents = await watchBuilds([], () => fs.writeFileSync(app, edited))

  expect(new Set(contents[1])).toEqual(new Set([edited]))
})

it('watch rebuild drops the pre transform map once the transform stops changing the file', async () => {
  createApp()
  const app = path.join(root, 'App.vue')
  const after = SFC.replace('before', 'after')
  const contents = await watchBuilds([rewrite('before', 'after')], () =>
    fs.writeFileSync(app, after),
  )

  expect(new Set(contents[0])).toEqual(new Set([SFC]))
  expect(new Set(contents[1])).toEqual(new Set([after]))
})
