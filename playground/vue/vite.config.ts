import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { vueI18nPlugin } from './CustomBlockPlugin.ts'

export default defineConfig({
  resolve: {
    alias: {
      '/@': import.meta.dirname,
      '@': import.meta.dirname,
      '#external': resolve(import.meta.dirname, '../vue-external'),
      '/#external': resolve(import.meta.dirname, '../vue-external'),
    },
  },
  plugins: [
    vuePlugin({
      script: {
        globalTypeFiles: [
          resolve(import.meta.dirname, 'HmrCircularReferenceFile.d.ts'),
        ],
      },
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('my-'),
        },
      },
    }),
    vueI18nPlugin,
  ],
  build: {
    // to make tests faster
    minify: false,
    assetsInlineLimit: 100, // keep SVG as assets URL
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
