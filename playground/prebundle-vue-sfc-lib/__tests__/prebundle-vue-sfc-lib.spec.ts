import { describe, expect, it } from 'vitest'
import { isServe, page, readVitePrebundleFile } from '~utils'

describe('prebundle Vue SFC library', () => {
  it('should page work', async () => {
    expect(await page.textContent('span:nth-child(1)')).toMatch('hello A')
    expect(await page.textContent('span:nth-child(2)')).toMatch('hello B')
    expect(await page.textContent('span:nth-child(3)')).toMatch('hello C')
    expect(await page.textContent('span:nth-child(4)')).toMatch('hello D')
  })

  it.runIf(isServe)('should prebundle @vitejs/test-lib-component', () => {
    const metadata = JSON.parse(readVitePrebundleFile('_metadata.json'))
    const target = metadata.optimized['@vitejs/test-lib-component']
    expect(target).toBeDefined()

    const bundled = readVitePrebundleFile(target.file)
    expect(bundled).toContain(
      'var CompA_default = plugin_vue_export_helper_default(_sfc_main',
    )
    expect(bundled).toContain(
      'var CompB_default = plugin_vue_export_helper_default(_sfc_main',
    )
    expect(bundled).toContain(
      'var CompC_default = plugin_vue_export_helper_default(_sfc_main',
    )
    expect(bundled).toContain(
      'var CompD_default = plugin_vue_export_helper_default(_sfc_main',
    )
  })
})
