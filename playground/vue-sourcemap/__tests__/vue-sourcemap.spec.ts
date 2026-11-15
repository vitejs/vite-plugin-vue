import { URL } from 'node:url'
import { describe, expect, test } from 'vitest'
import {
  extractSourcemap,
  findAssetFile,
  formatSourcemapForSnapshot,
  isBuild,
  isServe,
  page,
  readFile,
  serverLogs,
} from '~utils'

describe.runIf(isServe)('serve:vue-sourcemap', () => {
  const getStyleTagContentIncluding = async (content: string) => {
    const styles = await page.$$('style')
    for (const style of styles) {
      const text = (await style.textContent())!
      if (text.includes(content)) {
        return text
      }
    }
    throw new Error('Style not found: ' + content)
  }

  test('js', async () => {
    const res = await page.request.get(new URL('./Js.vue', page.url()).href)
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-js')
  })

  test('ts', async () => {
    const res = await page.request.get(new URL('./Ts.vue', page.url()).href)
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-ts')
  })

  test('css', async () => {
    const css = await getStyleTagContentIncluding('.css ')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-css')
  })

  test('css module', async () => {
    const css = await getStyleTagContentIncluding('._css-module_')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-css-module')
  })

  test('css scoped', async () => {
    const css = await getStyleTagContentIncluding('.css-scoped[data-v-')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-css-scoped')
  })

  test('sass', async () => {
    const css = await getStyleTagContentIncluding('.sass ')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-sass')
  })

  test('sass with import', async () => {
    const css = await getStyleTagContentIncluding('.sass-with-import ')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot(
      'serve-sass-with-import',
    )
  })

  test('less with additionalData', async () => {
    const css = await getStyleTagContentIncluding('.less ')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot(
      'serve-less-with-additionalData',
    )
  })

  test('src imported', async () => {
    const css = await getStyleTagContentIncluding('.src-import[data-v-')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot(
      'serve-src-imported',
    )
  })

  test('src imported sass', async () => {
    const css = await getStyleTagContentIncluding('.src-import-sass[data-v-')
    const map = extractSourcemap(css)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot(
      'serve-src-imported-sass',
    )
  })

  test('src imported html', async () => {
    const res = await page.request.get(
      new URL(
        './src-import-html/src-import.html?import&vue&type=template&src=true&lang.js',
        page.url(),
      ).href,
    )
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-html')
  })

  test('no script', async () => {
    const res = await page.request.get(
      new URL('./NoScript.vue', page.url()).href,
    )
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-no-script')
  })

  test('empty script', async () => {
    const res = await page.request.get(
      new URL('./EmptyScript.vue', page.url()).href,
    )
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot(
      'serve-empty-script',
    )
  })

  test('no template', async () => {
    const res = await page.request.get(
      new URL('./NoTemplate.vue', page.url()).href,
    )
    const js = await res.text()
    const map = extractSourcemap(js)
    expect(formatSourcemapForSnapshot(map)).toMatchSnapshot('serve-no-template')
  })

  test('script block of a pre-transformed sfc maps to the original file', async () => {
    const res = await page.request.get(
      new URL('./PreTransformed.vue?vue&type=script&lang.ts', page.url()).href,
    )
    const map = extractSourcemap(await res.text())
    const index = map.sources.findIndex((source: string) =>
      source.endsWith('PreTransformed.vue'),
    )
    expect(map.sourcesContent[index]).toBe(readFile('PreTransformed.vue'))
  })
})

test.runIf(isBuild)(
  'sourcemap sources of a pre-transformed sfc hold its original content',
  () => {
    const map = JSON.parse(findAssetFile(/\.js\.map$/))
    const contents = map.sources.flatMap((source: string, i: number) =>
      source.endsWith('PreTransformed.vue') ? [map.sourcesContent[i]] : [],
    )
    expect(contents.length).toBeGreaterThan(0)
    expect(new Set(contents)).toEqual(new Set([readFile('PreTransformed.vue')]))
  },
)

test.runIf(isBuild)('should not output sourcemap warning (#4939)', () => {
  serverLogs.forEach((log) => {
    expect(log).not.toMatch('Sourcemap is likely to be incorrect')
  })
})
