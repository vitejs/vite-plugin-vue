import vuePlugin from '@vitejs/plugin-vue'
import MagicString from 'magic-string'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      less: {
        additionalData: '@color: red;',
      },
    },
  },
  plugins: [
    {
      name: 'pre-transform-sfc',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('/PreTransformed.vue')) return
        const s = new MagicString(code)
        s.replace('__PRE_TRANSFORMED__', 'pre transformed')
        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true, hires: true }),
        }
      },
    },
    vuePlugin(),
  ],
  build: {
    sourcemap: true,
  },
})
