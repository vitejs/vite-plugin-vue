import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  inputOptions: {
    resolve: {
      alias: {
        // we can always use node version (the default entry point has browser support)
        debug: 'debug/src/node.js',
      },
    },
  },
  dts: true,
})
