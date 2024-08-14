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
}
