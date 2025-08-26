<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'

function methodDecorator(originalMethod: () => void, context: unknown) {
  return function (this: { value: { value: number } }) {
    const result = originalMethod.call(this)
    this.value.value += 1
    return result
  }
}

const Component = defineComponent(() => {
  class Counter {
    value = ref(3)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () =>
    h(
      'button',
      {
        class: 'decorators-vue-ts',
        onClick: inc,
      },
      `decorators vue ts ${counter.value.value}`,
    )
})
</script>
<template>
  <Component />
</template>
