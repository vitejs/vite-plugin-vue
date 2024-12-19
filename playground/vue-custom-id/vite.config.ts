import { defineConfig } from 'rolldown-vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vuePlugin({
      features: {
        componentIdGenerator: (filename) => {
          return filename
            .replace(/\.\w+$/, '')
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase()
        },
      },
    }),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
})
