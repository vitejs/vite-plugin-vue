import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import * as compiler from 'vue/compiler-sfc'
import type { ResolvedOptions } from '../src/index'
import { transformMain } from '../src/main'

let root: string

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

describe('transformMain', () => {
  it('reports inline template errors with a rollup location', async () => {
    const source = [
      '<script setup>const msg = "hi"</script>',
      '<template>',
      '  <span v-if="msg" v-else>{{ msg }}</span>',
      '</template>',
    ].join('\n')
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-'))
    const filename = path.join(root, 'Comp.vue')
    fs.writeFileSync(filename, source)
    const options = {
      root,
      isProduction: true,
      sourceMap: false,
      compiler,
    } as ResolvedOptions
    const pluginContext = {
      error(error: unknown) {
        throw error
      },
    } as any

    const error = await transformMain(
      source,
      filename,
      options,
      pluginContext,
      false,
      false,
    ).catch((e) => e)

    expect(error.loc).toEqual({ file: filename, line: 3, column: 3 })
    expect(error.message).toContain('v-else/v-else-if has no adjacent v-if')
  })
})
