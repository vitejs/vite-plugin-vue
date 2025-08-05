import { expect, test } from 'vitest'
import {
  editFile,
  getBgColor,
  isServe,
  page,
  untilBrowserLogAfter,
} from '~utils'

test.runIf(isServe)('regenerate CSS and HMR', async () => {
  const el = await page.$('.uno')
  expect(await getBgColor(el)).toBe('rgb(187, 247, 208)')

  await untilBrowserLogAfter(
    () =>
      editFile('HelloUnoCSS.vue', (code) =>
        code.replace('bg-green-200', 'bg-red-200'),
      ),
    [
      '[vite] hot updated: /HelloUnoCSS.vue',
      '[vite] hot updated: /HelloUnoCSS.vue?vue&type=style&index=0&scoped=468ceaae&lang.css',
    ],
    false,
  )
  await expect.poll(() => getBgColor(el)).toMatch('rgb(254, 202, 202)')
})
