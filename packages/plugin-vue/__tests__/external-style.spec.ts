import { expect, test, vi } from 'vitest'
import vuePlugin from '../src/index'
import { resolveCompiler } from '../src/compiler'

// A persistent transform cache can restore the SFC without running its main
// transform. External styles must also work in a fresh plugin instance.
test.each([
  [
    'first scoped block',
    'index=0&src=component-id&scoped=component-id',
    '.box[data-v-component-id]',
  ],
  [
    'second scoped block',
    'index=1&src=component-id&scoped=component-id',
    '.box[data-v-component-id]',
  ],
  [
    'pre-compiled scoped import',
    'src=legacy-id&scoped=true&id=explicit-id',
    '.box[data-v-explicit-id]',
  ],
  ['unscoped external block', 'index=1&src=true', '.box {'],
])('transforms uncached %s', async (_name, query, selector) => {
  const plugin = vuePlugin({ compiler: resolveCompiler(process.cwd()) })
  const transform = (plugin.transform as any).handler
  const result = await transform.call(
    {
      addWatchFile: vi.fn(),
      error(error: unknown) {
        throw error
      },
    },
    '.box { color: red; }',
    `/external.css?vue&type=style&${query}&lang.css`,
  )

  expect(result.code).toContain(selector)
  expect(result.meta).toBeUndefined()
})
