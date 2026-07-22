import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: import.meta.dirname,
  build: {
    outDir: 'dist/lib',
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(import.meta.dirname, 'src-lib-css/index.ts'),
      name: 'index',
      formats: ['umd'],
      fileName: 'index.js',
    },
  },
})
