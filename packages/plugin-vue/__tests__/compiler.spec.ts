import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { resolveConfig } from 'vite'
import * as compiler from 'vue/compiler-sfc'
import vuePlugin from '../src/index'
import { resolveCompiler } from '../src/compiler'

vi.mock('../src/compiler', () => ({
  resolveCompiler: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(resolveCompiler).mockReset()
  vi.mocked(resolveCompiler).mockReturnValue(compiler)
})

describe('compiler initialization', () => {
  it('initializes the compiler during config resolution using the resolved root', async () => {
    const root = path.resolve(process.cwd(), 'playground/vue')
    const plugin = vuePlugin()

    await resolveConfig({ configFile: false, root, plugins: [plugin] }, 'serve')

    expect(plugin.api!.options.compiler).toBe(compiler)
    expect(resolveCompiler).toHaveBeenCalledExactlyOnceWith(root)
  })

  it('preserves an explicitly supplied compiler', async () => {
    const customCompiler = { ...compiler }
    const plugin = vuePlugin({ compiler: customCompiler })

    await resolveConfig({ configFile: false, plugins: [plugin] }, 'serve')

    expect(plugin.api!.options.compiler).toBe(customCompiler)
    expect(resolveCompiler).not.toHaveBeenCalled()
  })
})
