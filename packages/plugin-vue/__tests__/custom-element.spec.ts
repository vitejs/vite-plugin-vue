import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { build } from 'vite'
import type { Rollup } from 'vite'
import vuePlugin from '../src/index'
import type { Options } from '../src/index'

let root: string

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'vite-plugin-vue-ce-'))
  fs.writeFileSync(
    path.join(root, 'Badge.ce.vue'),
    `<template><span class="badge">badge</span></template>\n` +
      `<style>.badge { color: red; }</style>\n`,
  )
})

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

async function buildBadge(options: Options) {
  const result = await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [vuePlugin(options)],
    build: {
      write: false,
      minify: false,
      lib: {
        entry: path.join(root, 'Badge.ce.vue'),
        formats: ['es'],
        fileName: 'badge',
        cssFileName: 'badge',
      },
      rollupOptions: {
        external: ['vue'],
      },
    },
  })
  const [output] = result as Rollup.RollupOutput[]
  const css = output.output
    .filter((file) => file.fileName.endsWith('.css'))
    .map((file) => (file as Rollup.OutputAsset).source)
    .join('\n')
  const js = output.output
    .filter((file): file is Rollup.OutputChunk => file.type === 'chunk')
    .map((file) => file.code)
    .join('\n')
  return { css, js }
}

describe('customElement option', () => {
  it('compiles *.ce.vue as a regular component with features.customElement: false', async () => {
    const { css, js } = await buildBadge({
      features: { customElement: false },
    })

    expect(css).toContain('.badge')
    expect(js).not.toContain('.badge')
  })

  it('compiles *.ce.vue as a custom element by default', async () => {
    const { css, js } = await buildBadge({})

    expect(css).not.toContain('.badge')
    expect(js).toContain('.badge')
  })

  it('still respects the deprecated customElement: false', async () => {
    const { css, js } = await buildBadge({ customElement: false })

    expect(css).toContain('.badge')
    expect(js).not.toContain('.badge')
  })
})
