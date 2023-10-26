import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { vueI18nPlugin } from './CustomBlockPlugin'

export default defineConfig({
  resolve: {
    alias: {
      '/@': __dirname,
      '@': __dirname,
    },
  },
  plugins: [
    vuePlugin({
      reactivityTransform: true,
    }),
    splitVendorChunkPlugin(),
    vueI18nPlugin,
  ],
  build: {
    // to make tests faster
    minify: false,
    assetsInlineLimit: 100, // keep SVG as assets URL
    rollupOptions: {
      output: {
        // Test splitVendorChunkPlugin composition
        manualChunks(id) {
          if (id.includes('src-import')) {
            return 'src-import'
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
