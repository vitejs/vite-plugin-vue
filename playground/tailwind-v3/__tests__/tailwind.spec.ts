import { expect, test } from 'vitest'
import {
  editFile,
  getBgColor,
  isServe,
  page,
  untilBrowserLogAfter,
  untilUpdated,
} from '~utils'

test.runIf(isServe)('regenerate CSS and HMR (pug template)', async () => {
  const el = await page.$('.pug')
  expect(await getBgColor(el)).toBe('rgb(248, 113, 113)')

  await untilBrowserLogAfter(
    () =>
      editFile('PugTemplate.vue', (code) =>
        code.replace('bg-red-400', 'bg-red-600'),
      ),
    [
      '[vite] css hot updated: /index.css',
      '[vite] hot updated: /PugTemplate.vue?vue&type=template&lang.js',
    ],
    false,
  )
  await untilUpdated(() => getBgColor(el), 'rgb(220, 38, 38)')
})
