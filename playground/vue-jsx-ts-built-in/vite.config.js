import { defineConfig } from 'vite'
import * as vite from 'vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import vuePlugin from '@vitejs/plugin-vue'
import babelPluginSyntaxDecorators from '@babel/plugin-syntax-decorators'
import swc from '@rollup/plugin-swc'

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
    // rolldown-vite does not support ecma decorators yet, use SWC for them
    // https://github.com/oxc-project/oxc/issues/9170
    'rolldownVersion' in vite &&
      vite.withFilter(
        {
          ...swc({
            swc: {
              jsc: {
                parser: { decorators: true, decoratorsBeforeExport: true },
                transform: { decoratorVersion: '2022-03' },
              },
            },
          }),
        },
        {
          transform: { id: /\/decorators\//, code: '@' },
        },
      ),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
})
