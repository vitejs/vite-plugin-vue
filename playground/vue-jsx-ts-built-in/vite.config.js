import { defineConfig } from 'vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import vuePlugin from '@vitejs/plugin-vue'
import babelPluginSyntaxDecorators from '@babel/plugin-syntax-decorators'

export default defineConfig({
  plugins: [
    vueJsxPlugin({
      tsTransform: 'built-in',
      babelPlugins: [
        [
          babelPluginSyntaxDecorators,
          // to test decorators we use only method decorators
          // they have the same syntax in 'legacy' and in '2023-11'
          { version: '2023-11' },
        ],
      ],
    }),
    vuePlugin(),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
})
