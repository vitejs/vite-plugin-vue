import { describe, expect, it } from 'vitest'
import * as compiler from 'vue/compiler-sfc'
import type { ResolvedOptions } from '../src/index'
import { resolveTemplateCompilerOptions } from '../src/template'

describe('template AST reuse', () => {
  it.each([
    ['3.3.13', false],
    ['3.4.0', false],
    ['3.4.2', false],
    ['3.4.3', true],
    ['3.4.38', true],
    ['3.5.0', true],
    ['3.5.1', true],
    ['3.5.2', true],
    ['3.5.40', true],
    ['3.6.0-beta.1', true],
    ['3.6.0-rc.8', true],
    ['3.6.0', true],
    [undefined, false],
  ])('passes the descriptor AST with compiler %s: %s', (version, reuse) => {
    const { descriptor } = compiler.parse(
      '<template><my-element /></template>',
      {
        templateParseOptions: {
          isCustomElement: (tag) => tag === 'my-element',
        },
      },
    )
    const options = {
      root: '/root',
      compiler: { ...compiler, version },
    } as ResolvedOptions

    const result = resolveTemplateCompilerOptions(
      descriptor,
      options,
      '/root/App.vue',
      false,
    )

    expect(result?.ast).toBe(reuse ? descriptor.template!.ast : undefined)
  })
})
