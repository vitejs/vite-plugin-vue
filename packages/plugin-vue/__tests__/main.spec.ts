import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as compiler from 'vue/compiler-sfc'
import type { ResolvedOptions } from '../src/index'
import { transformMain } from '../src/main'

let root: string

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

describe('transformMain', () => {
  it('parses the SFC once in build', async () => {
    const source =
      '<script setup>const msg = "hi"</script><template>{{ msg }}</template>'
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-'))
    const filename = path.join(root, 'Comp.vue')
    fs.writeFileSync(filename, source)
    const parse = vi.fn(compiler.parse)
    const options = {
      root,
      isProduction: true,
      sourceMap: false,
      compiler: { ...compiler, parse },
    } as ResolvedOptions

    await transformMain(source, filename, options, {} as any, false, false)

    expect(parse).toHaveBeenCalledTimes(1)
  })
})
