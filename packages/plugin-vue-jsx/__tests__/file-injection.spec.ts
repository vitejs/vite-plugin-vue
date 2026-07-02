import { describe, expect, it } from 'vitest'
import type { Plugin, ResolvedConfig } from 'vite'
import vueJsxPlugin from '../src/index'

function createPlugin(
  opts: { command?: 'serve' | 'build'; isProduction?: boolean } = {},
) {
  const { command = 'serve', isProduction = false } = opts
  const plugin = vueJsxPlugin() as Plugin
  ;(plugin.configResolved as any)({
    command,
    isProduction,
    build: { sourcemap: false },
    root: '/project',
  } as unknown as ResolvedConfig)
  return plugin
}

async function transform(plugin: Plugin, code: string, id: string, opts = {}) {
  const t = plugin.transform as any
  const handler = typeof t === 'function' ? t : t?.handler
  return handler?.call({ meta: {} }, code, id, opts)
}

const namedExportCode = `
import { defineComponent, ref } from 'vue'
export const MyComp = defineComponent(() => {
  const count = ref(0)
  return () => <div>{count.value}</div>
})
`

const namedSpecifierCode = `
import { defineComponent } from 'vue'
const MyComp = defineComponent(() => () => <div />)
export { MyComp }
`

const defaultExportCode = `
import { defineComponent } from 'vue'
export default defineComponent(() => () => <div />)
`

const defaultExportAsCode = `
import { defineComponent } from 'vue'
import type { DefineComponent } from 'vue'
export default defineComponent(() => () => <div />) as DefineComponent<any>
`

describe('__file injection', () => {
  describe('in dev/HMR mode', () => {
    it('injects __file on a named export (.jsx)', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, namedExportCode, id)
      expect(result?.code).toContain(`MyComp.__file = ${JSON.stringify(id)}`)
    })

    it('injects __file on a named export (.tsx)', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.tsx'
      const result = await transform(plugin, namedExportCode, id)
      expect(result?.code).toContain(`MyComp.__file = ${JSON.stringify(id)}`)
    })

    it('injects __file on a named export via specifier', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, namedSpecifierCode, id)
      expect(result?.code).toContain(`MyComp.__file = ${JSON.stringify(id)}`)
    })

    it('injects __file on a default export', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, defaultExportCode, id)
      expect(result?.code).toContain(
        `__default__.__file = ${JSON.stringify(id)}`,
      )
    })

    it('injects __file on a default export with type assertion (TSX)', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.tsx'
      const result = await transform(plugin, defaultExportAsCode, id)
      expect(result?.code).toContain(
        `__default__.__file = ${JSON.stringify(id)}`,
      )
    })

    it('injects __file alongside __hmrId', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, namedExportCode, id)
      expect(result?.code).toContain('__hmrId')
      expect(result?.code).toContain(`__file = ${JSON.stringify(id)}`)
    })

    it('does not inject __file for .vue script blocks', async () => {
      const plugin = createPlugin()
      // Simulate the id format for Vue SFC script blocks
      const id = '/project/src/Comp.vue?vue&type=script&lang.jsx'
      const result = await transform(plugin, namedExportCode, id)
      expect(result?.code).not.toContain('__file')
    })
  })

  describe('in build/production mode', () => {
    it('does not inject __file', async () => {
      const plugin = createPlugin({ command: 'build', isProduction: true })
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, namedExportCode, id)
      expect(result?.code).not.toContain('__file')
    })
  })

  describe('in SSR mode', () => {
    it('does not inject __file (uses ssrRegisterHelper instead)', async () => {
      const plugin = createPlugin()
      const id = '/project/src/MyComp.jsx'
      const result = await transform(plugin, namedExportCode, id, { ssr: true })
      expect(result?.code).not.toContain('__file')
      expect(result?.code).toContain('ssrRegisterHelper')
    })
  })
})
