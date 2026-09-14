import { type DefineComponent, defineComponent } from 'vue'

export default defineComponent({
  render() {
    return (
      <span class="export-default-as">export default defineComponent as</span>
    )
  },
}) as DefineComponent<any>
