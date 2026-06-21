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

  return async (id: string) => {
    const result = await transform.call({} as any, code, id)
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
  test('reuses the transform plugin', async () => {
    const transform = await createTransform()
    const result = await transform('/project/src/First.tsx')
    await transform('/project/src/Second.tsx')

    expect(pluginFactoryCalls.transformTypeScript).toBe(1)
    expect(result.code).not.toContain('interface Props')
  })

  test('reuses the syntax plugin in built-in transform mode', async () => {
    const transform = await createTransform('built-in')
    const result = await transform('/project/src/First.tsx')
    await transform('/project/src/Second.tsx')

    expect(pluginFactoryCalls.syntaxTypeScript).toBe(1)
    expect(result.code).toContain('interface Props')
  })
})
