import './external.css?vue&type=style&scoped=true&id=0d49ede6&src=0d49ede6&lang.css'

import {
  Fragment as _Fragment,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  popScopeId as _popScopeId,
  pushScopeId as _pushScopeId,
  toDisplayString as _toDisplayString,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  ref,
} from 'vue'
const __sfc__ = {
  setup() {
    const msg = ref('Hello World!')
    return { msg }
  },
}

const _withScopeId = (n) => (
  _pushScopeId('data-v-0d49ede6'), (n = n()), _popScopeId(), n
)
const _hoisted_1 = { class: 'pre-compiled-external-scoped-title' }

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode(
          'h6',
          _hoisted_1,
          _toDisplayString($setup.msg),
          1 /* TEXT */,
        ),
        _withDirectives(
          _createElementVNode(
            'input',
            {
              'onUpdate:modelValue':
                _cache[0] || (_cache[0] = ($event) => ($setup.msg = $event)),
            },
            null,
            512 /* NEED_PATCH */,
          ),
          [[_vModelText, $setup.msg]],
        ),
      ],
      64 /* STABLE_FRAGMENT */,
    )
  )
}
__sfc__.render = render

__sfc__.__scopeId = 'data-v-0d49ede6'
__sfc__.__file = 'external-scoped.vue'
export default __sfc__
