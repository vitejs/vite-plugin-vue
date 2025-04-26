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
  expect(await getBgColor(el)).toBe('oklch(0.704 0.191 22.216)')

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
  await untilUpdated(() => getBgColor(el), 'oklch(0.577 0.245 27.325)')
})
