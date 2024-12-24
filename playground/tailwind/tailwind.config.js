import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('tailwindcss').Config} */
export default {
  content: [__dirname + '/**/*.vue'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
