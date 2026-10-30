import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { normalizePath, resolveConfig } from 'vite'
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
  it('exposes an initialized compiler after configuration resolves', async () => {
    const plugin = vuePlugin()

    await resolveConfig({ configFile: false, plugins: [plugin] }, 'serve')

    // #474: During Nuxt warmup, @intlify/unplugin-vue-i18n copied the Vue
    // plugin options before buildStart initialized the compiler. The copied
    // compiler stayed null, causing SFC parsing to fail.
    // Initializing the compiler in configResolved prevents this.
    const copiedOptions = { ...plugin.api!.options }
    const { descriptor, errors } = copiedOptions.compiler.parse(
      '<script setup>const { t } = useI18n()</script><template>{{ t("hello") }}</template>',
      {
        filename: 'app.vue',
        templateParseOptions: copiedOptions.template?.compilerOptions,
      },
    )

    expect(errors).toEqual([])
    expect(descriptor.scriptSetup?.content).toBe('const { t } = useI18n()')
    expect(descriptor.template?.content).toBe('{{ t("hello") }}')
  })

  it('uses the configured project root when it differs from the working directory', async () => {
    const root = path.resolve(process.cwd(), 'playground/vue')
    const plugin = vuePlugin()

    await resolveConfig({ configFile: false, root, plugins: [plugin] }, 'serve')

    expect(plugin.api!.options.compiler).toBe(compiler)
    expect(resolveCompiler).toHaveBeenCalledWith(normalizePath(root))
  })

  it('preserves an explicitly supplied compiler', async () => {
    const customCompiler = { ...compiler }
    const plugin = vuePlugin({ compiler: customCompiler })

    await resolveConfig({ configFile: false, plugins: [plugin] }, 'serve')

    expect(plugin.api!.options.compiler).toBe(customCompiler)
    expect(resolveCompiler).not.toHaveBeenCalled()
  })
})
