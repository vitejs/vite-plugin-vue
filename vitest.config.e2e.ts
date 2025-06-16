import { resolve } from 'node:path'
import { defaultExclude, defineConfig } from 'vitest/config'
import * as vite from 'vite'

const timeout = process.env.CI ? 50000 : 30000

process.env.NODE_ENV = process.env.VITE_TEST_BUILD
  ? 'production'
  : 'development'

export default defineConfig({
  resolve: {
    alias: {
      '~utils': resolve(__dirname, './playground/test-utils'),
    },
  },
  test: {
    include: ['./playground/**/*.spec.[tj]s'],
    exclude: [
      ...defaultExclude,
      // plugin-legacy is not supported with rolldown-vite
      ...('rolldownVersion' in vite ? ['./playground/vue-legacy/**/*'] : []),
    ],
    setupFiles: ['./playground/vitestSetup.ts'],
    globalSetup: ['./playground/vitestGlobalSetup.ts'],
    testTimeout: timeout,
    hookTimeout: timeout,
    reporters: 'dot',
    onConsoleLog(log) {
      if (log.match(/experimental|jit engine|emitted file|tailwind/i))
        return false
    },
  },
})
