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
  it('forwards inline template warnings to the plugin context', async () => {
    const source =
      '<script setup>const msg = "hi"</script><template>{{ msg }}</template>'
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'plugin-vue-'))
    const filename = path.join(root, 'Comp.vue')
    fs.writeFileSync(filename, source)
    const warnOnInterpolation: NonNullable<
      compiler.CompilerOptions['nodeTransforms']
    >[number] = (node, context) => {
      if (node.type === 5) {
        context.onWarn(
          Object.assign(new SyntaxError('custom warning'), {
            code: 0,
            loc: node.loc,
          }),
        )
      }
    }
    const options = {
      root,
      isProduction: true,
      sourceMap: false,
      compiler,
      template: { compilerOptions: { nodeTransforms: [warnOnInterpolation] } },
    } as ResolvedOptions
    const pluginContext = { warn: vi.fn() } as any

    await transformMain(source, filename, options, pluginContext, false, false)

    expect(pluginContext.warn).toHaveBeenCalledExactlyOnceWith({
      id: filename,
      message: expect.stringMatching(/^custom warning\n.*\{\{ msg \}\}/s),
    })
  })
})
