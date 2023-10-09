import { publish } from '@vitejs/release-scripts'

publish({
  defaultPackage: 'plugin-vue',
  provenance: true,
  packageManager: 'pnpm',
})
