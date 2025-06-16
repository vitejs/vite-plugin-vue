import { describe, expect, test } from 'vitest'
import { version } from 'vue'
import * as vite from 'vite'
import {
  browserLogs,
  editFile,
  findAssetFile,
  getBg,
  getColor,
  isBuild,
  isServe,
  page,
  serverLogs,
} from '~utils'

const isRolldownVite = 'rolldownVersion' in vite

test('should render', async () => {
  expect(await page.textContent('h1')).toMatch(`Vue version ${version}`)
})

test('should update', async () => {
  expect(await page.textContent('.hmr-inc')).toMatch('count is 0')
  await page.click('.hmr-inc')
  expect(await page.textContent('.hmr-inc')).toMatch('count is 1')
})

test('import with query should work', async () => {
  expect(await page.textContent('.imported-with-query')).toMatch('ok')
})

test('template/script latest syntax support', async () => {
  expect(await page.textContent('.syntax')).toBe('baz')
})

test('import ts with .js extension with lang="ts"', async () => {
  expect(await page.textContent('.ts-import')).toBe('success')
  expect(await page.textContent('.ts-import2')).toBe('success')
})

test('should remove comments in prod', async () => {
  expect(await page.innerHTML('.comments')).toBe(isBuild ? `` : `<!--hello-->`)
})

test(':slotted', async () => {
  expect(await getColor('.slotted')).toBe('red')
})

describe('dep scan', () => {
  test('scan deps from <script setup lang="ts">', async () => {
    expect(await page.textContent('.scan')).toBe('ok')
  })

  test('find deps on initial scan', () => {
    serverLogs.forEach((log) => {
      expect(log).not.toMatch('new dependencies found')
    })
  })
})

describe('pre-processors', () => {
  test('pug', async () => {
    expect(await page.textContent('p.pug')).toMatch(
      `This is rendered from <template lang="pug">`,
    )
    // #1383 pug default doctype
    expect(await page.textContent('.pug-slot')).toMatch(`slot content`)
    if (isBuild) return
    editFile('PreProcessors.vue', (code) =>
      code.replace('Pre-Processors', 'Updated'),
    )
    await expect
      .poll(() => page.textContent('h2.pre-processors'))
      .toMatch('Updated')
  })

  test('scss', async () => {
    const el = await page.$('p.pug')
    expect(await getColor(el)).toBe('magenta')
    if (isBuild) return
    editFile('PreProcessors.vue', (code) =>
      code.replace('$color: magenta;', '$color: red;'),
    )
    await expect.poll(() => getColor(el)).toMatch('red')
  })

  test('less + scoped', async () => {
    const el = await page.$('p.pug-less')
    expect(await getColor(el)).toBe('green')
    if (isBuild) return
    editFile('PreProcessors.vue', (code) =>
      code.replace('@color: green;', '@color: blue;'),
    )
    await expect.poll(() => getColor(el)).toMatch('blue')
  })

  test('stylus + change lang', async () => {
    expect(await getColor('p.pug-stylus')).toBe('orange')
    if (isBuild) return
    editFile('PreProcessors.vue', (code) =>
      code
        .replace('<style lang="stylus">', '<style lang="scss">')
        .replace('color = orange', '$color: yellow;')
        .replace('color: color', '{ color: $color; }'),
    )
    await expect.poll(() => getColor('p.pug-stylus')).toMatch('yellow')
    editFile('PreProcessors.vue', (code) =>
      code.replace('$color: yellow;', '$color: orange;'),
    )
    await expect.poll(() => getColor('p.pug-stylus')).toMatch('orange')
  })

  test('pug hmr', async () => {
    expect(await page.textContent('p.pug-hmr')).toMatch('pre-hmr')
    if (isBuild) return
    editFile('PreProcessorsHmr.vue', (code) =>
      code
        .replace('p.pug-hmr {{ preHmr }}', 'p.pug-hmr {{ postHmr }}')
        .replace(`const preHmr = 'pre-hmr'`, `const postHmr = 'post-hmr'`),
    )
    await expect.poll(() => page.textContent('p.pug-hmr')).toMatch('post-hmr')
  })
})

describe('css modules', () => {
  test('basic', async () => {
    expect(await getColor('.sfc-css-modules')).toBe('blue')
    if (isBuild) return
    editFile('CssModules.vue', (code) =>
      code.replace('color: blue;', 'color: red;'),
    )
    await expect.poll(() => getColor('.sfc-css-modules')).toMatch('red')
  })

  test('with preprocessor + name', async () => {
    expect(await getColor('.sfc-css-modules-with-pre')).toBe('orange')
    if (isBuild) return
    editFile('CssModules.vue', (code) =>
      code.replace('color: orange;', 'color: blue;'),
    )
    await expect
      .poll(() => getColor('.sfc-css-modules-with-pre'))
      .toMatch('blue')
  })
})

describe('asset reference', () => {
  const assetMatch = isBuild
    ? /\/assets\/asset-[-\w]{8}\.png/
    : '/assets/asset.png'

  test('should not 404', () => {
    browserLogs.forEach((msg) => {
      expect(msg).not.toMatch('404')
    })
  })

  test('relative import', async () => {
    const el = await page.$('img.relative-import')
    expect(await el.evaluate((el) => (el as HTMLImageElement).src)).toMatch(
      assetMatch,
    )
  })

  test('absolute import', async () => {
    const el = await page.$('img.absolute-import')
    expect(await el.evaluate((el) => (el as HTMLImageElement).src)).toMatch(
      assetMatch,
    )
  })

  test('absolute import from public dir', async () => {
    const el = await page.$('img.public-import')
    expect(await el.evaluate((el) => (el as HTMLImageElement).src)).toMatch(
      `/icon.png`,
    )
  })

  test('svg fragment', async () => {
    const img = await page.$('.svg-frag')
    expect(await img.getAttribute('src')).toMatch(/svg#icon-heart-view$/)
  })

  test('relative url from <style>', async () => {
    const assetMatch = isBuild
      ? /\/assets\/asset-[-\w]{8}\.png/
      : '/assets/asset.png'
    expect(await getBg('.relative-style-url')).toMatch(assetMatch)
  })
})

describe.runIf(isServe)('hmr', () => {
  test('should re-render and preserve state when template is edited', async () => {
    editFile('Hmr.vue', (code) => code.replace('HMR', 'HMR updated'))
    await expect.poll(() => page.textContent('h2.hmr')).toMatch('HMR updated')
    expect(await page.textContent('.hmr-inc')).toMatch('count is 1')
  })

  test('should update style and preserve state when style is edited', async () => {
    expect(await getColor('.hmr-inc')).toBe('red')
    editFile('Hmr.vue', (code) => code.replace('color: red;', 'color: blue;'))
    await expect.poll(() => getColor('.hmr-inc')).toMatch('blue')
    expect(await page.textContent('.hmr-inc')).toMatch('count is 1')
  })

  test('should preserve state when script is merely formatted', async () => {
    // this is the state from the previous test
    expect(await page.textContent('.hmr-inc')).toMatch('count is 1')

    editFile('Hmr.vue', (code) =>
      code
        .replace('let foo: number = 0', '  let foo: number = 0\n\n')
        // also edit the style so that we can have something to wait for
        .replace('color: blue;', 'color: black;'),
    )
    await expect.poll(() => getColor('.hmr-inc')).toMatch('black')
    // should preserve state
    expect(await page.textContent('.hmr-inc')).toMatch('count is 1')
  })

  test('should reload and reset state when script is edited', async () => {
    editFile('Hmr.vue', (code) =>
      code.replace('let foo: number = 0', 'let foo: number = 100'),
    )
    await expect
      .poll(() => page.textContent('.hmr-inc'))
      .toMatch('count is 100')
  })

  test('should reload when relies file changed', async () => {
    // rerender
    await expect.poll(() => page.textContent('h2.hmr')).toMatch('HMR updated')
    editFile('Hmr.vue', (code) =>
      code.replace('HMR updated', 'HMR updated updated'),
    )
    await expect
      .poll(() => page.textContent('h2.hmr'))
      .toMatch('HMR updated updated')
    await expect.poll(() => page.textContent('.hmr-number')).toMatch('100')

    // reload
    editFile('lib.js', (code) => code.replace('100', '200'))
    await expect.poll(() => page.textContent('.hmr-number')).toMatch('200')
  })

  test('global hmr for some scenarios', async () => {
    editFile('Hmr.vue', (code) =>
      code.replace('</template>', '  <Node/>\n' + '</template>'),
    )
    await expect.poll(() => page.innerHTML('.node')).toMatch('this is node')
  })

  test('should re-render when template is emptied', async () => {
    editFile('Hmr.vue', (code) => code.replace(/<template>.+<\/template>/s, ''))
    await expect.poll(() => page.innerHTML('.hmr-block')).toMatch('<!---->')
  })

  test('should re-render when template and tsx script both changed', async () => {
    editFile('HmrTsx.vue', (code) => code.replace(/count/g, 'updatedCount'))
    await expect
      .poll(() => page.innerHTML('.hmr-tsx-block .hmr-tsx-inc'))
      .toMatch('updatedCount is 0')
  })

  test('should handle circular reference (issue 325)', async () => {
    editFile('HmrCircularReference.vue', (code) =>
      code.replace('let foo: number = 0', 'let foo: number = 100'),
    )
    await expect
      .poll(() => page.textContent('.hmr-circular-reference-inc'))
      .toMatch('count is 100')
  })
})

describe('src imports', () => {
  test('script src with ts', async () => {
    expect(await page.textContent('.src-imports-script')).toMatch(
      'hello from script src',
    )
    if (isBuild) return
    editFile('src-import/script.ts', (code) =>
      code.replace('hello from script src', 'updated'),
    )
    await expect
      .poll(() => page.textContent('.src-imports-script'))
      .toMatch('updated')
  })

  test('style src', async () => {
    const el = await page.$('.src-imports-style')
    expect(await getColor(el)).toBe('tan')
    if (isBuild) return
    editFile('src-import/style.css', (code) =>
      code.replace('color: tan', 'color: red'),
    )
    await expect.poll(() => getColor(el)).toMatch('red')
  })

  test.runIf(isServe)('template src import hmr', async () => {
    const el = await page.$('.src-imports-style')
    editFile('src-import/template.html', (code) =>
      code.replace('should be tan', 'should be red'),
    )
    await expect.poll(() => el.textContent()).toMatch('should be red')
  })
})

describe('external src imports', () => {
  test('script src with ts', async () => {
    expect(await page.textContent('.external-src-imports-script')).toMatch(
      'hello from script src',
    )
    if (isBuild) return
    editFile('../vue-external/src-import/script.ts', (code) =>
      code.replace('hello from script src', 'updated'),
    )
    await expect
      .poll(() => page.textContent('.external-src-imports-script'))
      .toMatch('updated')
  })

  test('style src', async () => {
    const el = await page.$('.external-src-imports-style')
    expect(await getColor(el)).toBe('tan')
    if (isBuild) return
    editFile('../vue-external/src-import/style.css', (code) =>
      code.replace('color: tan', 'color: red'),
    )
    await expect.poll(() => getColor(el)).toMatch('red')
  })

  test.runIf(isServe)('template src import hmr', async () => {
    const el = await page.$('.external-src-imports-style')
    editFile('../vue-external/src-import/template.html', (code) =>
      code.replace('should be tan', 'should be red'),
    )
    await expect.poll(() => el.textContent()).toMatch('should be red')
  })
})

describe('custom blocks', () => {
  test('should work', async () => {
    expect(await page.textContent('.custom-block')).toMatch('こんにちは')
  })
})

describe('async component', () => {
  test('should work', async () => {
    expect(await page.textContent('.async-component')).toMatch('ab == ab')
  })
})

describe('custom element', () => {
  test('should work', async () => {
    await page.click('.custom-element')
    expect(await page.textContent('.custom-element')).toMatch('count: 2')
    expect(await getColor('.custom-element')).toBe('green')
  })
})

describe('setup import template', () => {
  test('should work', async () => {
    expect(await page.textContent('.setup-import-template')).toMatch('0')
    await page.click('.setup-import-template')
    expect(await page.textContent('.setup-import-template')).toMatch('1')
  })
})

describe('vue worker', () => {
  test('should work', async () => {
    expect(await page.textContent('.vue-worker')).toMatch('worker load!')
  })
})

describe('import with ?url', () => {
  test('should work', async () => {
    expect(await page.textContent('.import-with-url-query')).toMatch(
      isBuild ? /^data:/ : '/Null.vue',
    )
  })
})

describe('macro imported types', () => {
  test('should resolve and render correct props', async () => {
    expect(await page.textContent('.type-props')).toMatch(
      JSON.stringify(
        {
          msg: 'msg',
          bar: 'bar',
          id: 123,
        },
        null,
        2,
      ),
    )
  })

  test.runIf(isServe)('should hmr', async () => {
    editFile('types.ts', (code) => code.replace('msg: string', ''))
    await expect
      .poll(() => page.textContent('.type-props'))
      .toMatch(
        JSON.stringify(
          {
            bar: 'bar',
            id: 123,
          },
          null,
          2,
        ),
      )

    editFile('types-aliased.d.ts', (code) => code.replace('id: number', ''))
    await expect
      .poll(() => page.textContent('.type-props'))
      .toMatch(
        JSON.stringify(
          {
            bar: 'bar',
          },
          null,
          2,
        ),
      )
  })

  test.runIf(isServe)('should hmr with lang=tsx', async () => {
    editFile('types.ts', (code) => code.replace('msg: string', ''))
    await expect
      .poll(() => page.textContent('.type-props-tsx'))
      .toMatch(
        JSON.stringify(
          {
            bar: 'bar',
          },
          null,
          2,
        ),
      )
  })

  test.runIf(isServe)(
    'should hmr when SFC is treated as a type dependency',
    async () => {
      const cls1 = '.export-type-props1'
      expect(await getColor(cls1)).toBe('red')
      editFile('ExportTypeProps1.vue', (code) => code.replace('red', 'blue'))
      await expect.poll(() => getColor(cls1)).toMatch('blue')

      const cls2 = '.export-type-props2'
      editFile('ExportTypeProps1.vue', (code) =>
        code.replace('msg: string', ''),
      )
      await expect
        .poll(() => page.textContent(cls2))
        .toMatch(JSON.stringify({}, null, 2))
    },
  )
})

test('TS with generics', async () => {
  expect(await page.textContent('.generic')).toMatch('hello')
})

describe('default langs', () => {
  test('should work', async () => {
    expect(await page.textContent('.default-langs')).toBe('foo')
    expect(await getColor('.default-langs')).toBe('blue')
  })
})

describe('pre-compiled components', () => {
  test('should work', async () => {
    expect(await getColor('.pre-compiled-title')).toBe('red')
  })
  test('should work with external scoped style', async () => {
    expect(await getColor('.pre-compiled-external-scoped-title')).toBe('red')
  })
  test('should work with external css modules', async () => {
    expect(await getColor('.pre-compiled-external-cssmodules')).toBe('red')
  })
})

describe('template parse options', () => {
  test('isCustomElement', async () => {
    expect(await page.textContent('.custom-element-from-options')).toMatch(
      'custom',
    )
  })
})

// skip this test for now with rolldown-vite as this requires https://github.com/rolldown/rolldown/issues/4812 to be implemented
test.runIf(isBuild && !isRolldownVite)(
  'scoped style should be tree-shakeable',
  async () => {
    const indexCss = findAssetFile(/index-[\w-]+\.css/)
    expect(indexCss).not.toContain('.tree-shake-scoped-style')
  },
)
