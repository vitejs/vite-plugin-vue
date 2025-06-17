import { expect, test } from 'vitest'
import { getBg } from '~utils'

test('vue legacy assets', async () => {
  await expect.poll(() => getBg('.main')).toMatch('assets/asset')
})

test('async vue legacy assets', async () => {
  await expect.poll(() => getBg('.module')).toMatch('assets/asset')
})
