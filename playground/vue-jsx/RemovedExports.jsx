import { defineComponent } from 'vue'

export const Retained = defineComponent({
  render: () => <p class="retained-export">retained original</p>,
})

export const Removed = defineComponent({ render: () => <p>removed</p> })
export const Renamed = defineComponent({ render: () => <p>renamed</p> })
