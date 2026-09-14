import { expect, test } from 'vitest'
import { page } from '~utils'

test('should render', async () => {
  expect(await page.textContent('.decorators-ts')).toMatch('1')
  expect(await page.textContent('.decorators-tsx')).toMatch('2')
  expect(await page.textContent('.decorators-vue-ts')).toMatch('3')
  expect(await page.textContent('.decorators-vue-tsx')).toMatch('4')
  expect(await page.textContent('.decorators-legacy-ts')).toMatch('5')
  expect(await page.textContent('.decorators-legacy-tsx')).toMatch('6')
  expect(await page.textContent('.decorators-legacy-vue-ts')).toMatch('7')
  expect(await page.textContent('.decorators-legacy-vue-tsx')).toMatch('8')
})

test('should update', async () => {
  await page.click('.decorators-ts')
  expect(await page.textContent('.decorators-ts')).toMatch('2')
  await page.click('.decorators-tsx')
  expect(await page.textContent('.decorators-tsx')).toMatch('3')
  await page.click('.decorators-vue-ts')
  expect(await page.textContent('.decorators-vue-ts')).toMatch('4')
  await page.click('.decorators-vue-tsx')
  expect(await page.textContent('.decorators-vue-tsx')).toMatch('5')
  await page.click('.decorators-legacy-ts')
  expect(await page.textContent('.decorators-legacy-ts')).toMatch('6')
  await page.click('.decorators-legacy-tsx')
  expect(await page.textContent('.decorators-legacy-tsx')).toMatch('7')
  await page.click('.decorators-legacy-vue-ts')
  expect(await page.textContent('.decorators-legacy-vue-ts')).toMatch('8')
  await page.click('.decorators-legacy-vue-tsx')
  expect(await page.textContent('.decorators-legacy-vue-tsx')).toMatch('9')
})
