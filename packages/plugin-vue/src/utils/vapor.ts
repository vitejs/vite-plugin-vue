import type { SFCDescriptor } from 'vue/compiler-sfc'

interface VaporModeOptions {
  features?: {
    vapor?: boolean
  }
}

/**
 * Resolve the effective Vapor mode for an SFC handled by this plugin.
 *
 * `descriptor.vapor` is the per-file opt-in marker. `features.vapor` is the
 * plugin-level force switch for SFCs that can be forced into Vapor mode.
 */
export function isVaporMode(
  descriptor: SFCDescriptor,
  options: VaporModeOptions,
): boolean {
  // @ts-expect-error TODO remove when 3.6 is out
  if (descriptor.vapor) {
    return true
  }
  if (options.features?.vapor) {
    return canForceVaporMode(descriptor)
  }
  return false
}

/**
 * `features.vapor` can force template-only SFCs, `<script setup>` SFCs, and
 * non-`.vue` transformed SFCs into Vapor mode. It cannot force `.vue` SFCs
 * with only a normal `<script>` because Vapor SFC support requires
 * `<script setup>`.
 */
function canForceVaporMode(descriptor: SFCDescriptor): boolean {
  if (descriptor.filename.endsWith('.vue')) {
    if (descriptor.scriptSetup) {
      return true
    }
    if (descriptor.script) {
      return false
    }
  }

  return true
}
