export function exactRegex(input: string): RegExp {
  return new RegExp(`^${escapeRegex(input)}$`)
}

const escapeRegexRE = /[-/\\^$*+?.()|[\]{}]/g
function escapeRegex(str: string): string {
  return str.replace(escapeRegexRE, '\\$&')
}

export function matchWithQuery(input: string | RegExp): string | RegExp {
  if (typeof input === 'string') {
    return `${input}{?*,}`
  }
  return addQueryToRegex(input)
}

function addQueryToRegex(input: RegExp) {
  return new RegExp(
    // replace `$` with `(?:\?.*)?$` (ignore `\$`)
    input.source.replace(/(?<!\\)\$/g, '(?:\\?.*)?$'),
    input.flags,
  )
}
