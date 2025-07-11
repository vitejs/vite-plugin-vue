<script setup lang="tsx">
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
    value = ref(4)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () => (
    <button class="decorators-vue-tsx" onClick={inc}>
      {`decorators vue tsx ${counter.value.value}`}
    </button>
  )
})
</script>
<template>
  <Component />
</template>
