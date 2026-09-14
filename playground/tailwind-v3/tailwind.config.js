import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

/** @type {import('tailwindcss').Config} */
export default {
  content: [import.meta.dirname + '/**/*.vue'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
