import { defineComponent, ref } from 'vue'

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

export default defineComponent(() => {
  class Counter {
    value = ref(6)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () => (
    <button class="decorators-legacy-tsx" onClick={inc}>
      {`decorators legacy tsx ${counter.value.value}`}
    </button>
  )
})
