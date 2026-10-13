import { describe, expect, it, vi } from 'vitest'
import type { ResolvedOptions } from '../src/index'
import { resolveCompiler } from '../src/compiler'
import { transformMain } from '../src/main'
import { resolveScript } from '../src/script'
import { getDescriptor } from '../src/utils/descriptorCache'

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

function createPluginContext() {
  return {
    warn: vi.fn(),
    error: vi.fn((error: unknown) => {
      throw error
    }),
  } as any
}

describe('ssr-then-client descriptor cache', () => {
  // This simulates the flow that poisons client transforms in Vitest when a
  // workspace mixes ssr (jsdom) and browser projects:
  //   1. Main SSR transform of Component.vue populates the descriptor cache
  //      and runs `compileScript` with `templateOptions.ssr = true`, mutating
  //      the cached descriptor with ssr-specific state.
  //   2. A subsequent sub-block transform (triggered by the client pass, e.g.
  //      `Component.vue?vue&type=template`) looks the descriptor up via
  //      `getDescriptor` — without the fix this returned the same mutated
  //      descriptor, so `resolveScript(desc, ssr=false)` then ran
  //      `compileScript` on a descriptor already tainted with ssr state and
  //      emitted a setup whose `__returned__` dropped template-only imports.
  it('keeps ssr and client descriptor state separate', async () => {
    const filename = '/root/Component.vue'
    const source = [
      '<script setup>',
      "import Child from './Child.vue'",
      '</script>',
      '<template><Child /></template>',
    ].join('\n')
    const options = createOptions()

    // Step 1: main SSR transform caches and mutates an ssr descriptor.
    await transformMain(
      source,
      filename,
      options,
      createPluginContext(),
      /* ssr */ true,
      /* customElement */ false,
    )

    // Step 2: client flow resolves the cached descriptor — before the fix this
    // returned the SSR-poisoned descriptor, shared between both modes.
    const clientDescriptor = getDescriptor(
      filename,
      options,
      /* createIfNotFound */ true,
      /* hmr */ false,
      source,
      /* ssr */ false,
    )!
    const ssrDescriptor = getDescriptor(
      filename,
      options,
      /* createIfNotFound */ false,
      /* hmr */ false,
      undefined,
      /* ssr */ true,
    )

    expect(ssrDescriptor).toBeDefined()
    // The descriptors must not be the same object, otherwise a subsequent
    // `resolveScript` call runs `compileScript` on an ssr-tainted descriptor.
    expect(clientDescriptor).not.toBe(ssrDescriptor)

    // Step 3: resolving the client script on the client descriptor must
    // produce output that retains the template-only import binding.
    const clientScript = resolveScript(
      clientDescriptor,
      options,
      /* ssr */ false,
      /* customElement */ false,
    )!
    expect(clientScript).toBeTruthy()
    expect(clientScript.bindings).toMatchObject({ Child: expect.any(String) })
    // The compiled script keeps `Child` as a setup-referenceable binding so
    // the render function can resolve it.
    expect(clientScript.content).toMatch(/\bChild\b/)
  })
})
