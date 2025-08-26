<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'

function methodDecorator(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value
  descriptor.value = function () {
    const result = originalMethod.call(this)
    this.value.value += 1
    return result
  }
}

const Component = defineComponent(() => {
  class Counter {
    value = ref(7)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () =>
    h(
      'button',
      {
        class: 'decorators-legacy-vue-ts',
        onClick: inc,
      },
      `decorators legacy vue ts ${counter.value.value}`,
    )
})
</script>
<template>
  <Component />
</template>
