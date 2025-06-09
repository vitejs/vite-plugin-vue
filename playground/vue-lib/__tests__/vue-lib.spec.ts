import path from 'node:path'
import type { Rollup } from 'vite'
import { build } from 'vite'
import * as vite from 'vite'
import { describe, expect, test } from 'vitest'

const isRolldownVite = 'rolldownVersion' in vite

describe('vue component library', () => {
  // skip this test for now with rolldown-vite due to https://github.com/oxc-project/oxc/issues/10033
  test.skipIf(isRolldownVite)(
    'should output tree shakeable css module code',
    async () => {
      // Build lib
      await build({
        logLevel: 'silent',
        configFile: path.resolve(__dirname, '../vite.config.lib.ts'),
      })
      // Build app
      const { output } = (await build({
        logLevel: 'silent',
        configFile: path.resolve(__dirname, '../vite.config.consumer.ts'),
      })) as Rollup.RollupOutput
      const { code } = output.find(
        (e) => e.type === 'chunk' && e.isEntry,
      ) as Rollup.OutputChunk
      // Unused css module should be treeshaked
      expect(code).toContain('styleA') // styleA is used by CompA
      expect(code).not.toContain('styleB') // styleB is not used
    },
  )

  test('should inject css when cssCodeSplit = true', async () => {
    // Build lib
    const { output } = (
      await build({
        logLevel: 'silent',
        configFile: path.resolve(__dirname, '../vite.config.lib-css.ts'),
      })
    )[0]
    expect(output[0].code).toContain('.card{padding:4rem}')
  })
})
