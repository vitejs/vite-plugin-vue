import { beforeEach, describe, expect, test, vi } from 'vitest'
import vueJsxPlugin from '../src/index'

const pluginFactoryCalls = vi.hoisted(() => ({
  syntaxTypeScript: 0,
  transformTypeScript: 0,
}))

vi.mock('@babel/plugin-syntax-typescript', async (importOriginal) => {
  const original = await importOriginal<any>()
  return {
    ...original,
    default(...args: any[]) {
      pluginFactoryCalls.syntaxTypeScript++
      return original.default(...args)
    },
  }
})

vi.mock('@babel/plugin-transform-typescript', async (importOriginal) => {
  const original = await importOriginal<any>()
  return {
    ...original,
    default(...args: any[]) {
      pluginFactoryCalls.transformTypeScript++
      return original.default(...args)
    },
  }
})

const code = `
import { defineComponent } from 'vue'

interface Props {
  message: string
}

export default defineComponent((props: Props) => {
  return () => <div>{props.message}</div>
})
`

async function createTransform(tsTransform?: 'babel' | 'built-in') {
  const plugin = vueJsxPlugin({ tsTransform })
  if (typeof plugin.configResolved !== 'function') {
    throw new TypeError('Missing configResolved hook')
  }
  await plugin.configResolved.call(
    {} as any,
    {
      command: 'build',
      isProduction: true,
      build: { sourcemap: false },
      root: '/project',
    } as any,
  )

  const transform =
    typeof plugin.transform === 'object'
      ? plugin.transform.handler
      : plugin.transform
  if (!transform) throw new TypeError('Missing transform hook')

  return async (id: string, ssr = false) => {
    const result = await transform.call({} as any, code, id, { ssr })
    if (!result || typeof result === 'string') {
      throw new TypeError('Missing transform result')
    }
    return result
  }
}

beforeEach(() => {
  pluginFactoryCalls.syntaxTypeScript = 0
  pluginFactoryCalls.transformTypeScript = 0
})

describe('TypeScript plugin caching', () => {
  test('reuses the transform plugin for client and SSR transforms', async () => {
    const transform = await createTransform()
    const clientResult = await transform('/project/src/Client.tsx')
    const ssrResult = await transform('/project/src/Server.tsx', true)

    expect(pluginFactoryCalls.transformTypeScript).toBe(1)
    expect(clientResult.code).not.toContain('interface Props')
    expect(clientResult.code).toContain('/* @__PURE__ */ defineComponent')
    expect(ssrResult.code).toContain('const __default__ = defineComponent')
    expect(ssrResult.code).toContain(
      'ssrRegisterHelper(__default__, __moduleId)',
    )
  })

  test('reuses the syntax plugin in built-in transform mode', async () => {
    const transform = await createTransform('built-in')
    const firstResult = await transform('/project/src/First.tsx')
    const secondResult = await transform('/project/src/Second.tsx')

    expect(pluginFactoryCalls.syntaxTypeScript).toBe(1)
    expect(firstResult.code).toContain('interface Props')
    expect(secondResult.code).toBe(firstResult.code)
  })
})
