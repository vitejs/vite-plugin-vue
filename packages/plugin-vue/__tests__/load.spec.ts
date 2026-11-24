import fs from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as compiler from 'vue/compiler-sfc'
import vuePlugin from '../src/index'
import { resolveCompiler } from '../src/compiler'
import { cache, setSrcDescriptor } from '../src/utils/descriptorCache'

vi.mock('../src/compiler', () => ({
  resolveCompiler: vi.fn(() => compiler),
}))

afterEach(() => {
  cache.clear()
  vi.restoreAllMocks()
})

describe('load', () => {
  it('reports the owning SFC when a style src file is missing', async () => {
    const root = path.resolve(process.cwd(), 'playground/vue')
    const owner = path.join(root, 'MissingStyleSrc.vue')
    const src = path.join(root, 'missing.css')
    const readFileSync = vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory')
    })
    const descriptor = compiler.parse('<template><div /></template>', {
      filename: owner,
    }).descriptor
    descriptor.id = 'test-id'
    setSrcDescriptor(src, descriptor, true)

    const plugin = vuePlugin()
    await plugin.configResolved!(
      {
        root,
        command: 'serve',
        isProduction: false,
        configFile: false,
        build: {},
        css: {},
        define: {},
        logger: { warn: vi.fn() },
      } as any,
      {} as any,
    )
    const id = `${src}?vue&type=style&index=0&src=test-id&scoped=1`
    const context = {
      error: (message: string) => new Error(message),
    }

    expect(() =>
      plugin.load!.handler.call(context as any, id, {} as any),
    ).toThrow(
      /Failed to load style src .* imported by .*MissingStyleSrc\.vue.*ENOENT/,
    )
  })

  it('reports the owner when a non-scoped style src file is missing', async () => {
    const root = path.resolve(process.cwd(), 'playground/vue')
    const owner = path.join(root, 'MissingStyleSrc.vue')
    const src = path.join(root, 'missing.css')
    const readFileSync = vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory')
    })
    const descriptor = compiler.parse('<template><div /></template>', {
      filename: owner,
    }).descriptor
    setSrcDescriptor(src, descriptor)

    const plugin = vuePlugin()
    await plugin.configResolved!(
      {
        root,
        command: 'serve',
        isProduction: false,
        configFile: false,
        build: {},
        css: {},
        define: {},
        logger: { warn: vi.fn() },
      } as any,
      {} as any,
    )
    const id = `${src}?vue&type=style&index=0&src=true`
    const context = {
      error: (message: string) => new Error(message),
    }

    expect(() =>
      plugin.load!.handler.call(context as any, id, {} as any),
    ).toThrow(/MissingStyleSrc\.vue/)
  })
})
