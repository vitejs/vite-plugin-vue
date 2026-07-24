import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import type { FilterPattern } from 'vite'

export interface FilterOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export interface Options extends VueJSXPluginOptions, FilterOptions {
  babelPlugins?: any[]
  /** @default ['defineComponent'] */
  defineComponentName?: string[]
  tsPluginOptions?: any
  /** @default 'babel' */
  tsTransform?: 'babel' | 'built-in'
  /**
   * Automatically wrap non-function default slot children like SFC compiler does.
   * @default false
   */
  autoWrapDefaultSlot?: boolean
}
