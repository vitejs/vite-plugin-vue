import { defineConfig } from 'vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vueJsxPlugin({
      tsTransform: 'built-in',
      babelPlugins: [
        // to tests decorators we use only method decorators
        // they have the same syntax in 'legacy' and in '2023-11'
        ['@babel/plugin-syntax-decorators', { version: '2023-11' }],
      ],
    }),
    vuePlugin(),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
  optimizeDeps: {
    disabled: true,
  },
})
