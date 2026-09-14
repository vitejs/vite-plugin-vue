import { defineComponent, ref } from 'vue'

function methodDecorator(originalMethod: () => void, context: unknown) {
  return function (this: { value: { value: number } }) {
    const result = originalMethod.call(this)
    this.value.value += 1
    return result
  }
}

export default defineComponent(() => {
  class Counter {
    value = ref(2)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () => (
    <button class="decorators-tsx" onClick={inc}>
      {`decorators tsx ${counter.value.value}`}
    </button>
  )
})
