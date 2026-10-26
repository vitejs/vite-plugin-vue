import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { build } from 'vite'
import vuePlugin from '../src/index'

let root: string

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

describe('tsconfig option', () => {
  it('is used when compiling <script lang="ts"> in SFCs', async () => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-tsconfig-'))
    // tsconfig.json is the one that gets auto-discovered; it is broken on
    // purpose, so it only compiles when the `tsconfig` option is honored.
    fs.writeFileSync(
      path.join(root, 'tsconfig.json'),
      JSON.stringify({ references: [{ path: './tsconfig.missing.json' }] }),
    )
    fs.writeFileSync(
      path.join(root, 'tsconfig.vite.json'),
      JSON.stringify({ compilerOptions: { target: 'esnext' } }),
    )
    fs.writeFileSync(
      path.join(root, 'App.vue'),
      `<script lang="ts">
export default { name: 'App' as string }
</script>
<template><div /></template>`,
    )
    fs.writeFileSync(
      path.join(root, 'main.ts'),
      `import App from './App.vue'\nconsole.log(App)\n`,
    )

    await expect(
      build({
        root,
        configFile: false,
        logLevel: 'silent',
        // @ts-ignore only available in Vite 8+
        tsconfig: path.join(root, 'tsconfig.vite.json'),
        plugins: [vuePlugin()],
        build: {
          write: false,
          lib: { entry: 'main.ts', formats: ['es'] },
          rolldownOptions: { external: [/^vue/, /^\0/] },
        },
      }),
    ).resolves.toBeDefined()
  })
})
