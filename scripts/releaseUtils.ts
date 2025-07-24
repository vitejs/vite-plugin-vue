import colors from 'picocolors'
import type { Options as ExecaOptions, ResultPromise } from 'execa'
import { execa } from 'execa'
import fs from 'fs-extra'

function run<EO extends ExecaOptions>(
  bin: string,
  args: string[],
  opts?: EO,
): ResultPromise<EO & (keyof EO extends 'stdio' ? {} : { stdio: 'inherit' })> {
  return execa(bin, args, { stdio: 'inherit', ...opts }) as any
}

export async function getLatestTag(pkgName: string): Promise<string> {
  const pkgJson = await fs.readJson(`packages/${pkgName}/package.json`)
  const version = pkgJson.version
  return `${pkgName}@${version}`
}

export async function logRecentCommits(pkgName: string): Promise<void> {
  const tag = await getLatestTag(pkgName)
  if (!tag) return
  const sha = await run('git', ['rev-list', '-n', '1', tag], {
    stdio: 'pipe',
  }).then((res) => res.stdout.trim())
  console.log(
    colors.bold(
      `\n${colors.blue(`i`)} Commits of ${colors.green(
        pkgName,
      )} since ${colors.green(tag)} ${colors.gray(`(${sha.slice(0, 5)})`)}`,
    ),
  )
  await run(
    'git',
    [
      '--no-pager',
      'log',
      `${sha}..HEAD`,
      '--oneline',
      '--',
      `packages/${pkgName}`,
    ],
    { stdio: 'inherit' },
  )
  console.log()
}
