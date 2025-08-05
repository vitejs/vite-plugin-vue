import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [vue(), UnoCSS({ mode: 'vue-scoped' })],
  build: {
    // to make tests faster
    minify: false,
  },
})
