import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { build, normalizePath } from 'vite'
import type { Rollup } from 'vite'
import vuePlugin from '../src/index'

const tempDirs: string[] = []

function createTempProject() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vite-plugin-vue-613-'))
  tempDirs.push(dir)
  fs.mkdirSync(path.join(dir, 'src/path1'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'src/path2'), { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    '<script type="module" src="/src/main.js"></script>',
  )
  return dir
}

function getBundledCss(
  result: Rollup.RollupOutput | Rollup.RollupOutput[] | Rollup.RollupWatcher,
): string {
  const outputs = Array.isArray(result) ? result : [result]
  let css = ''
  for (const out of outputs) {
    if ('output' in out) {
      for (const chunk of out.output) {
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          css += String(chunk.source)
        }
      }
    }
  }
  return css
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

describe('scoped style bundling with unnormalized resolved paths', () => {
  it('bundles scoped CSS when a custom resolver returns native OS paths (e.g. Windows backslashes)', async () => {
    const root = createTempProject()
    fs.writeFileSync(
      path.join(root, 'src/main.js'),
      `import Scoped from '&/Scoped.vue'\nconsole.log(Scoped)\n`,
    )
    fs.writeFileSync(
      path.join(root, 'src/path2/Scoped.vue'),
      `<template><div class="scoped">scoped</div></template>\n<style scoped>.scoped { color: blue; }</style>\n`,
    )

    const result = await build({
      root,
      configFile: false,
      logLevel: 'silent',
      plugins: [
        {
          name: 'native-path-resolver',
          enforce: 'pre',
          resolveId(source) {
            if (source.startsWith('&/')) {
              return fileURLToPath(
                new URL(
                  `./src/path2/${source.slice(2)}`,
                  pathToFileURL(path.join(root, 'vite.config.js')),
                ),
              )
            }
          },
        },
        vuePlugin(),
      ],
      build: {
        write: false,
        minify: false,
        rollupOptions: {
          external: ['vue'],
        },
      },
    })

    const css = getBundledCss(result)
    expect(css).toContain('.scoped[data-v-')
    expect(css).toContain('color: blue')
  })

  it('bundles scoped CSS when a custom resolver returns an unnormalized path with relative segments', async () => {
    const root = createTempProject()
    fs.writeFileSync(
      path.join(root, 'src/main.js'),
      `import Scoped from '&/Scoped.vue'\nconsole.log(Scoped)\n`,
    )
    fs.writeFileSync(
      path.join(root, 'src/path2/Scoped.vue'),
      `<template><div class="rel">rel</div></template>\n<style scoped>.rel { color: green; }</style>\n`,
    )

    const result = await build({
      root,
      configFile: false,
      logLevel: 'silent',
      plugins: [
        {
          name: 'unnormalized-path-resolver',
          enforce: 'pre',
          resolveId(source) {
            if (source.startsWith('&/')) {
              return `${normalizePath(root)}/src/path1/../path2/${source.slice(2)}`
            }
          },
        },
        vuePlugin(),
      ],
      build: {
        write: false,
        minify: false,
        rollupOptions: {
          external: ['vue'],
        },
      },
    })

    const css = getBundledCss(result)
    expect(css).toContain('.rel[data-v-')
    expect(css).toContain('color: green')
  })
})
