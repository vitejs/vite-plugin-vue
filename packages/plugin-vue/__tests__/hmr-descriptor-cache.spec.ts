import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ResolvedOptions } from '../src/index'
import { resolveCompiler } from '../src/compiler'
import { transformMain } from '../src/main'
import {
  getDescriptor,
  invalidateDescriptor,
} from '../src/utils/descriptorCache'

const compiler = resolveCompiler(process.cwd())

const source = `<template><div class="box">hi</div></template>
<script setup>const a = 1</script>
`

let dir: string
let filename: string

// the HMR branch in transformMain is guarded by fs.existsSync, so the file has to be
// real - otherwise the branch is skipped for the wrong reason and the test cannot fail
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-hmr-'))
  filename = path.join(dir, 'Comp.vue')
  fs.writeFileSync(filename, source)
})

afterEach(() => {
  invalidateDescriptor(filename)
  invalidateDescriptor(filename, true)
  fs.rmSync(dir, { recursive: true, force: true })
})

function createOptions(devServer?: unknown): ResolvedOptions {
  return {
    root: dir,
    isProduction: true,
    sourceMap: false,
    cssDevSourcemap: false,
    devServer,
    compiler,
  } as ResolvedOptions
}

function createPluginContext() {
  return {
    warn: vi.fn(),
    error: vi.fn((error: unknown) => {
      throw error
    }),
  } as any
}

describe('HMR descriptor cache', () => {
  it('is not populated on a build', async () => {
    const options = createOptions(undefined)

    await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )

    // hmrCache is only ever read by handleHotUpdate(), which never runs on a build,
    // and both caches live until the process exits
    expect(getDescriptor(filename, options, false, true)).toBeUndefined()
  })

  it('is still populated when a dev server is present', async () => {
    const devServer = { config: { server: {} }, watcher: { on: vi.fn() } }
    const options = createOptions(devServer)

    await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )

    expect(getDescriptor(filename, options, false, true)).toBeDefined()
  })
})
