import { describe, expect, it } from 'vitest'
import type { Plugin, ResolvedConfig } from 'vite'
import vueJsxPlugin from '../src/index'

function createPlugin() {
  const plugin = vueJsxPlugin() as Plugin
  // Simulate configResolved with serve + dev (needHmr = true)
  const fakeConfig = {
    command: 'serve',
    isProduction: false,
    build: { sourcemap: false },
    root: '/project',
  } as unknown as ResolvedConfig
  ;(plugin.configResolved as Function)(fakeConfig)
  return plugin
}

async function transform(plugin: Plugin, code: string, id: string) {
  const handler =
    typeof plugin.transform === 'function'
      ? plugin.transform
      : (plugin.transform as any)?.handler
  return handler?.call({ meta: {} }, code, id, {})
}

const defineComponentCode = `
import { defineComponent, ref } from 'vue'

export const MyButton = defineComponent(() => {
  const count = ref(0)
  return () => <button>{count.value}</button>
})
`

describe('__file injection in dev/HMR mode', () => {
  it('injects __file on a named defineComponent export (.jsx)', async () => {
    const plugin = createPlugin()
    const id = '/project/src/components/MyButton.jsx'
    const result = await transform(plugin, defineComponentCode, id)
    expect(result?.code).toContain(`MyButton.__file = ${JSON.stringify(id)}`)
  })

  it('injects __file on a named defineComponent export (.tsx)', async () => {
    const plugin = createPlugin()
    const id = '/project/src/components/MyButton.tsx'
    const tsxCode = defineComponentCode
    const result = await transform(plugin, tsxCode, id)
    expect(result?.code).toContain(`MyButton.__file = ${JSON.stringify(id)}`)
  })

  it('injects __file alongside __hmrId', async () => {
    const plugin = createPlugin()
    const id = '/project/src/MyComp.jsx'
    const result = await transform(plugin, defineComponentCode, id)
    expect(result?.code).toContain('__hmrId')
    expect(result?.code).toContain(`__file = ${JSON.stringify(id)}`)
  })

  it('does not inject __file when not in HMR mode', async () => {
    const plugin = vueJsxPlugin() as Plugin
    const fakeConfig = {
      command: 'build',
      isProduction: true,
      build: { sourcemap: false },
      root: '/project',
    } as unknown as ResolvedConfig
    ;(plugin.configResolved as Function)(fakeConfig)

    const id = '/project/src/MyComp.jsx'
    const result = await transform(plugin, defineComponentCode, id)
    expect(result?.code).not.toContain('__file')
  })
})
