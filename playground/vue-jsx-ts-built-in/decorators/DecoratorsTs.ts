import { defineComponent, h, ref } from 'vue'

function methodDecorator(originalMethod: () => void, context: unknown) {
  return function (this: { value: { value: number } }) {
    const result = originalMethod.call(this)
    this.value.value += 1
    return result
  }
}

export default defineComponent(() => {
  class Counter {
    value = ref(1)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () =>
    h(
      'button',
      {
        class: 'decorators-ts',
        onClick: inc,
      },
      `decorators ts ${counter.value.value}`,
    )
})
