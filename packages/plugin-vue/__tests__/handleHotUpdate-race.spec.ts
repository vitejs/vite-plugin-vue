import { describe, expect, it, vi } from 'vitest'
import type { HmrContext } from 'vite'
import vuePlugin from '../src/index'

// Regression test for a race in Vite's dev-server restart flow.
//
// `options.value.compiler` is only assigned in the plugin's `buildStart`
// hook, not in `configResolved`. Vite's `restartServer()` (triggered by any
// change to vite.config.*) builds the new watcher and plugin instances via
// `_createServer(..., { listen: false })`, but only calls `buildStart`
// later, inside `server.listen()`. The gap between those two — spent
// awaiting `server.close()` of the *old* server — is a window in which a
// file-change event can reach `handleHotUpdate` on a plugin instance whose
// `compiler` is still `null`.
//
// `handleHotUpdate` dereferences `options.value.compiler.invalidateTypeCache`
// unconditionally, before the file filter is even checked, so it used to
// crash with:
//   TypeError: null is not an object
//   (evaluating 'options.value.compiler.invalidateTypeCache')
// for *any* changed file, not just `.vue` files.
//
// Reproducible end-to-end with:
//   touch vite.config.ts; sleep <0.1-0.8>; touch <any file>
// (deterministic only on a project whose watched tree is large enough that
// `server.close()` measurably outlasts the restart). This test reproduces
// the same crash deterministically, without timing or a running server, by
// calling `handleHotUpdate` on a freshly created plugin instance before
// `buildStart` has run.
describe('handleHotUpdate before buildStart', () => {
  function createHotUpdateContext(file: string): HmrContext {
    return {
      file,
      timestamp: Date.now(),
      modules: [],
      read: async () => '',
      server: { ws: { send: vi.fn() } },
    } as unknown as HmrContext
  }

  it('does not throw when a hot update arrives before the compiler is resolved', () => {
    // No configResolved()/buildStart() call: mirrors the state of a plugin
    // instance created by restartServer() ahead of the new buildStart run.
    const plugin = vuePlugin()
    const ctx = createHotUpdateContext('/root/src/main.ts')

    expect(() =>
      (plugin.handleHotUpdate as (ctx: HmrContext) => unknown)(ctx),
    ).not.toThrow()
    expect(ctx.server.ws.send).not.toHaveBeenCalled()
  })

  it('crashes on any changed file, not just .vue files, before the fix', () => {
    // Same as above with a non-.vue file, confirming the guard sits before
    // the file filter rather than being masked by it.
    const plugin = vuePlugin()
    const ctx = createHotUpdateContext('/root/package.json')

    expect(() =>
      (plugin.handleHotUpdate as (ctx: HmrContext) => unknown)(ctx),
    ).not.toThrow()
  })
})
