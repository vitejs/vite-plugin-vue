import { generateChangelog, release } from '@vitejs/release-scripts'
import colors from 'picocolors'
import { logRecentCommits } from './releaseUtils'

release({
  repo: 'vite-plugin-vue',
  packages: ['plugin-vue', 'plugin-vue-jsx'],
  toTag: (pkg, version) => `${pkg}@${version}`,
  logChangelog: (pkg) => logRecentCommits(pkg),
  generateChangelog: async (pkgName) => {
    console.log(colors.cyan('\nGenerating changelog...'))
    await generateChangelog({
      getPkgDir: () => `packages/${pkgName}`,
      tagPrefix: `${pkgName}@`,
    })
  },
})
