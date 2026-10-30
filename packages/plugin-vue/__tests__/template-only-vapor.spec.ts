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

    expect(mainResult?.code).toContain('import { render as _sfc_render }')
    expect(mainResult?.code).toContain('const _sfc_main = { __vapor: true }')
    expect(templateResult.code).toContain('_template(')
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
})

describe('VitePress markdown vapor', () => {
  it('forces only the template into vapor mode', async () => {
    const filename = '/root/index.md'
    const source = `
      <script >
      export const __pageData = JSON.parse("{\\"title\\":\\"Hello\\",\\"description\\":\\"\\",\\"frontmatter\\":{},\\"headers\\":[],\\"relativePath\\":\\"index.md\\",\\"filePath\\":\\"index.md\\"}")
      export default {name:"index.md",__vapor:true}
      </script>
      <template><div><h1 id="hello" tabindex="-1">Hello</h1></div></template>
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

    expect(result?.code).toContain('__vapor:true')
    expect(compileScript).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        vapor: false,
        templateOptions: expect.objectContaining({
          vapor: true,
        }),
      }),
    )
    expect(compileTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        vapor: true,
      }),
    )
  })
})
