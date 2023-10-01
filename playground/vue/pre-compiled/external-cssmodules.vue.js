import {
  Fragment as _Fragment,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
} from 'vue'

import style0 from './external.module.css?module=true&lang.module.css'

const __sfc__ = {
  data() {
    return {
      isRed: true,
    }
  },
}

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode(
          'p',
          {
            class: _normalizeClass({
              [_ctx.$style.red]: $data.isRed,
              'pre-compiled-external-cssmodules': true,
            }),
          },
          ' Am I red? ',
          2 /* CLASS */,
        ),
        _createElementVNode(
          'p',
          {
            class: _normalizeClass([
              _ctx.$style.red,
              _ctx.$style.bold,
              'pre-compiled-external-cssmodules',
            ]),
          },
          ' Red and bold ',
          2 /* CLASS */,
        ),
      ],
      64 /* STABLE_FRAGMENT */,
    )
  )
}
__sfc__.render = render
const cssModules = {}
cssModules['$style'] = style0
__sfc__.__cssModules = cssModules
__sfc__.__file = 'external-cssmodules.vue'
export default __sfc__
