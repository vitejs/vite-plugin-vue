import { release } from '@vitejs/release-scripts'
import colors from 'picocolors'
import { logRecentCommits, run } from './releaseUtils'

release({
  repo: 'vite-plugin-vue',
  packages: ['plugin-vue', 'plugin-vue-jsx'],
  toTag: (pkg, version) => `${pkg}@${version}`,
  logChangelog: (pkg) => logRecentCommits(pkg),
  generateChangelog: async (pkgName) => {
    console.log(colors.cyan('\nGenerating changelog...'))
    const changelogArgs = [
      'conventional-changelog',
      '-p',
      'angular',
      '-i',
      'CHANGELOG.md',
      '-s',
      '--commit-path',
      '.',
      '--lerna-package',
      pkgName,
    ]
    await run('npx', changelogArgs, { cwd: `packages/${pkgName}` })
  },
})
