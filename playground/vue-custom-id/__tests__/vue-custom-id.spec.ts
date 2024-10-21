import { expect, test } from 'vitest'
import { page } from '~utils'

test('should render', async () => {
  expect(await page.innerHTML('div')).toMatch(
    '<h1 data-v-components-foo="">Foo</h1>',
  )
})
