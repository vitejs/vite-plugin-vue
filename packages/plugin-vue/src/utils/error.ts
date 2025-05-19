import type { CompilerError } from 'vue/compiler-sfc'
import type { Rollup } from 'vite'

export function createRollupError(
  id: string,
  error: CompilerError | SyntaxError,
): Rollup.RollupError {
  const { message, name, stack } = error
  const rollupError: Rollup.RollupError = {
    id,
    plugin: 'vue',
    message,
    name,
    stack,
  }

  if ('code' in error && error.loc) {
    rollupError.loc = {
      file: id,
      line: error.loc.start.line,
      column: error.loc.start.column,
    }
  }

  return rollupError
}
