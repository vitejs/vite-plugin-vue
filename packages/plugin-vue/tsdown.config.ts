import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/index.ts',
  dts: {
    tsgo: true,
  },
  inlineOnly: [
    'slash',
    '@jridgewell/sourcemap-codec',
    '@jridgewell/resolve-uri',
    '@jridgewell/trace-mapping',
    '@jridgewell/gen-mapping',
    'obug',
  ],
})
