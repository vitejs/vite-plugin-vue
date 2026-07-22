import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/foo/',
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  plugins: [vuePlugin()],
  build: {
    // to make tests faster
    minify: false,
  },
})
