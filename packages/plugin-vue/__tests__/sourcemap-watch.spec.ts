import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, expect, it } from 'vitest'
import { type Rolldown, build } from 'vite'
import vue from '../src/index'

let root: string

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

function appSourceContents(): string[] {
  const assets = path.join(root, 'dist/assets')
  const file = fs.readdirSync(assets).find((f) => f.endsWith('.js.map'))!
  const map = JSON.parse(fs.readFileSync(path.join(assets, file), 'utf-8'))
  return map.sources.flatMap((source: string, i: number) =>
    source.endsWith('App.vue') ? [map.sourcesContent[i]] : [],
  )
}

it('watch rebuild maps an edited sfc to its new content', async () => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-watch-'))
  fs.writeFileSync(
    path.join(root, 'index.html'),
    '<script type="module" src="/main.ts"></script>',
  )
  fs.writeFileSync(
    path.join(root, 'main.ts'),
    "import App from './App.vue'\nconsole.log(App)\n",
  )
  const app = path.join(root, 'App.vue')
  fs.writeFileSync(
    app,
    `<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'App' })
</script>

<template>
  <p>before</p>
</template>
`,
  )

  const watcher = (await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [vue()],
    build: {
      sourcemap: true,
      minify: false,
      watch: {},
      rolldownOptions: { external: ['vue'] },
    },
  })) as Rolldown.RolldownWatcher

  const contents: string[][] = []
  await new Promise<void>((resolve, reject) => {
    watcher.on('event', (event) => {
      if (event.code === 'BUNDLE_END') event.result.close()
      if (event.code === 'ERROR') reject(event.error)
      if (event.code !== 'END') return
      contents.push(appSourceContents())
      if (contents.length === 1) {
        fs.writeFileSync(
          app,
          fs.readFileSync(app, 'utf-8').replace('before', 'after'),
        )
      } else {
        resolve()
      }
    })
  }).finally(() => watcher.close())

  expect(contents[1].length).toBeGreaterThan(0)
  expect(new Set(contents[1])).toEqual(new Set([fs.readFileSync(app, 'utf-8')]))
})
