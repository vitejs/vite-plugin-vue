import { describe, expect, it, vi } from 'vitest'
import type { SFCDescriptor } from 'vue/compiler-sfc'
import type { ResolvedOptions } from '../src/index'
import { resolveCompiler } from '../src/compiler'
import { transformMain } from '../src/main'
import { transformTemplateAsModule } from '../src/template'
import { createDescriptor } from '../src/utils/descriptorCache'

const compiler = resolveCompiler(process.cwd())

function createOptions(): ResolvedOptions {
  return {
    root: '/root',
    isProduction: false,
    sourceMap: false,
    cssDevSourcemap: false,
    compiler,
  } as ResolvedOptions
}

function parseDescriptor(
  filename: string,
  source: string,
  options: ResolvedOptions,
): SFCDescriptor {
  const { descriptor, errors } = createDescriptor(filename, source, options)
  if (errors.length) {
    throw errors[0]
  }
  return descriptor
}

function createPluginContext() {
  return {
    warn: vi.fn(),
    error: vi.fn((error: unknown) => {
      throw error
    }),
  } as any
}

// TODO: remove todo in v3.6
describe.todo('template-only vapor __multiRoot', () => {
  it('attaches __multiRoot for inline multi-root templates', async () => {
    const filename = '/root/Inline.vue'
    const source = '<template vapor><div /><div /></template>'
    const options = createOptions()

    const result = await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )

    expect(result?.code).toContain('const _sfc_main = { __vapor: true }')
    expect(result?.code).toContain('_sfc_main.__multiRoot = true')
  })

  it('preserves false multiRoot values for inline single-root templates', async () => {
    const filename = '/root/InlineSingle.vue'
    const source = '<template vapor><div /></template>'
    const options = createOptions()

    const result = await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )

    expect(result?.code).toContain('_sfc_main.__multiRoot = false')
  })

  it('re-exports and imports multiRoot for external template modules', async () => {
    const filename = '/root/External.vue'
    const source = '<template vapor lang="pug">div\ndiv</template>'
    const options = createOptions()
    const descriptor = parseDescriptor(filename, source, options)

    const mainResult = await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )
    const templateResult = await transformTemplateAsModule(
      descriptor.template!.content,
      filename,
      descriptor,
      options,
      createPluginContext(),
      false,
      false,
    )

    expect(mainResult?.code).toContain(
      'import { render as _sfc_render, multiRoot as _sfc_multiRoot }',
    )
    expect(mainResult?.code).toContain('_sfc_main.__multiRoot = _sfc_multiRoot')
    expect(templateResult.code).toContain('export const multiRoot = true')
  })

  it('does not attach __multiRoot when the component has script', async () => {
    const filename = '/root/WithScript.vue'
    const source =
      '<script>export default {}</script><template vapor lang="pug">div</template>'
    const options = createOptions()

    const result = await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      false,
      false,
    )

    expect(result?.code).not.toContain('__multiRoot')
    expect(result?.code).not.toContain('multiRoot as _sfc_multiRoot')
  })
})
