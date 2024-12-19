import path from 'node:path'
import { defineConfig } from 'rolldown-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: __dirname,
  build: {
    minify: false,
    outDir: 'dist/lib',
    lib: {
      entry: path.resolve(__dirname, 'src-lib/index.ts'),
      name: 'MyVueLib',
      formats: ['es'],
      fileName: 'my-vue-lib',
      // Vite 6 only property to give a specific name to the css file.
      // Set as "style" to match Vite 5 for testing purposes.
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
  plugins: [vue()],
})
