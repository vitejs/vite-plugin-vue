import { defineConfig } from 'rolldown-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: __dirname,
  build: {
    outDir: 'dist/consumer',
  },
  plugins: [vue()],
})
