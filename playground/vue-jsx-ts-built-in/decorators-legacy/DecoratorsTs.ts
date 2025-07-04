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

export default defineComponent(() => {
  class Counter {
    value = ref(5)

    @methodDecorator
    increment() {}
  }

  const counter = new Counter()
  const inc = () => counter.increment()

  return () =>
    h(
      'button',
      {
        class: 'decorators-legacy-ts',
        onClick: inc,
      },
      `decorators legacy ts ${counter.value.value}`,
    )
})
