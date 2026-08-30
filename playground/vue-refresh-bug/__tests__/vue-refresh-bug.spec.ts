import { expect, test } from 'vitest'
import { browserErrors, browserLogs, isBuild, page } from '~utils'

test('should render without React refresh injection', async () => {
  expect(await page.textContent('.refresh-bug')).toMatch(
    'This should render without $RefreshSig$ errors',
  )
})

test.runIf(!isBuild)(
  'should not inject $RefreshSig$ or $RefreshReg$ into Vue SFCs',
  async () => {
    for (const log of browserLogs) {
      expect(log).not.toMatch(/\$RefreshSig\$/)
      expect(log).not.toMatch(/\$RefreshReg\$/)
    }

    for (const error of browserErrors) {
      expect(error.message).not.toMatch(/\$RefreshSig\$/)
      expect(error.message).not.toMatch(/\$RefreshReg\$/)
    }
  },
)
