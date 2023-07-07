import './external.css?scoped=true&id=0d49ede6&lang.css'

import { ref } from 'vue'
const __sfc__ = {
  setup() {
    const msg = ref('Hello World!')
    return { msg }
  },
}

import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  pushScopeId as _pushScopeId,
  popScopeId as _popScopeId,
} from 'vue'

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
