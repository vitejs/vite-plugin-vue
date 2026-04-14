import type { SFCDescriptor } from 'vue/compiler-sfc'

interface VaporModeOptions {
  features?: {
    vapor?: boolean
  }
}

/**
 * Resolve the effective Vapor mode for a Vue SFC (`.vue`) file.
 *
 * `descriptor.vapor` is the per-file opt-in marker. `features.vapor` is the
 * plugin-level force switch: when enabled, every Vue SFC handled by this plugin
 * is compiled as Vapor mode even if the descriptor itself is not marked.
 */
export function isVaporMode(
  descriptor: SFCDescriptor,
  options: VaporModeOptions,
): boolean {
  // @ts-expect-error TODO remove when 3.6 is out
  return !!(descriptor.vapor || options.features?.vapor)
}
