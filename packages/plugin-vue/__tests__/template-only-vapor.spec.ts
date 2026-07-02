import { describe, expect, it, vi } from 'vitest'
import type { SFCDescriptor } from 'vue/compiler-sfc'
import type { ResolvedOptions } from '../src/index'
import { resolveCompiler } from '../src/compiler'
import { transformMain } from '../src/main'
import { clearScriptCache, resolveScript } from '../src/script'
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

function createForcedVaporOptions(): ResolvedOptions {
  return {
    ...createOptions(),
    features: {
      vapor: true,
    },
  }
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

// TODO: remove todo in v3.6
describe.todo('features.vapor', () => {
  it('forces a template-only Vue SFC to compile in vapor mode', async () => {
    const filename = '/root/Forced.vue'
    const source = '<template><div /><div /></template>'
    const options = createForcedVaporOptions()

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

  it('forces external template modules to compile in vapor mode', async () => {
    const filename = '/root/ForcedExternal.vue'
    const source = '<template lang="pug">div\ndiv</template>'
    const options = createForcedVaporOptions()
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

  it('passes forced vapor mode to compileScript', () => {
    const filename = '/root/ForcedScript.vue'
    const options = createForcedVaporOptions()
    const descriptor = parseDescriptor(
      filename,
      '<script setup>const msg = "hi"</script><template>{{ msg }}</template>',
      options,
    )
    const compileScript = vi.fn(() => ({
      ...descriptor.scriptSetup!,
      content: 'const _sfc_main = {}',
    }))

    clearScriptCache()
    resolveScript(
      descriptor,
      {
        ...options,
        compiler: {
          ...compiler,
          compileScript,
        },
      },
      false,
      false,
    )

    expect(compileScript).toHaveBeenCalledWith(
      descriptor,
      expect.objectContaining({
        vapor: true,
        templateOptions: expect.objectContaining({
          vapor: true,
        }),
      }),
    )
  })

  it('does not force normal script SFCs into vapor mode', async () => {
    const filename = '/root/NormalScript.vue'
    const source = `
      <script>
      export default {
        props: {
          href: String
        }
      }
      </script>
      <template><a :href="href"><slot /></a></template>
    `
    const options = createForcedVaporOptions()
    const compileScript = vi.fn(compiler.compileScript)
    const compileTemplate = vi.fn(compiler.compileTemplate)

    const result = await transformMain(
      source,
      filename,
      {
        ...options,
        compiler: {
          ...compiler,
          compileScript,
          compileTemplate,
        },
      },
      createPluginContext(),
      false,
      false,
    )

    expect(result?.code).not.toContain('__vapor: true')
    expect(result?.code).not.toContain('template as _template')
    expect(compileScript).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        vapor: false,
        templateOptions: expect.objectContaining({
          vapor: false,
        }),
      }),
    )
    expect(compileTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        vapor: false,
      }),
    )
  })

  it('forces SFCs with both normal script and script setup into vapor mode', async () => {
    const filename = '/root/ScriptAndSetup.vue'
    const source = `
      <script>
      export default {
        props: {
          href: String
        }
      }
      </script>
      <script setup>
      const msg = 'hi'
      </script>
      <template><a :href="href">{{ msg }}</a></template>
    `
    const options = createForcedVaporOptions()
    const compileScript = vi.fn(compiler.compileScript)

    await transformMain(
      source,
      filename,
      {
        ...options,
        compiler: {
          ...compiler,
          compileScript,
        },
      },
      createPluginContext(),
      false,
      false,
    )

    expect(compileScript).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        vapor: true,
        templateOptions: expect.objectContaining({
          vapor: true,
        }),
      }),
    )
  })

  it('continues to force VitePress markdown SFCs into vapor mode', async () => {
    const filename = '/root/index.md'
    const source = `
      <script >
      export const __pageData = JSON.parse("{\\"title\\":\\"Hello\\",\\"description\\":\\"\\",\\"frontmatter\\":{},\\"headers\\":[],\\"relativePath\\":\\"index.md\\",\\"filePath\\":\\"index.md\\"}")
      export default {name:"index.md",__vapor:true}
      </script>
      <template><div><h1 id="hello" tabindex="-1">Hello</h1></div></template>
    `
    const options = createForcedVaporOptions()
    const compileTemplate = vi.fn(compiler.compileTemplate)

    await transformMain(
      source,
      filename,
      {
        ...options,
        compiler: {
          ...compiler,
          compileTemplate,
        },
      },
      createPluginContext(),
      false,
      false,
    )

    expect(compileTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        vapor: true,
      }),
    )
  })
})
