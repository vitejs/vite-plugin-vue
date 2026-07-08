import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vuePlugin()],
  // simulate what @vitejs/plugin-react does:
  // it sets config.oxc.jsx.refresh = true globally
  oxc: {
    jsx: {
      refresh: true,
    },
  },
  build: {
    minify: false,
  },
})
