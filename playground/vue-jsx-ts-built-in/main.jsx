import { createApp } from 'vue'
import DecoratorsTs from './decorators/DecoratorsTs'
import DecoratorsTsx from './decorators/DecoratorsTsx'
import DecoratorsVueTs from './decorators/DecoratorsVueTs.vue'
import DecoratorsVueTsx from './decorators/DecoratorsVueTsx.vue'
import DecoratorsLegacyTs from './decorators-legacy/DecoratorsTs'
import DecoratorsLegacyTsx from './decorators-legacy/DecoratorsTsx'
import DecoratorsLegacyVueTs from './decorators-legacy/DecoratorsVueTs.vue'
import DecoratorsLegacyVueTsx from './decorators-legacy/DecoratorsVueTsx.vue'

function App() {
  return (
    <>
      <DecoratorsTs />
      <DecoratorsTsx />
      <DecoratorsVueTs />
      <DecoratorsVueTsx />
      <DecoratorsLegacyTs />
      <DecoratorsLegacyTsx />
      <DecoratorsLegacyVueTs />
      <DecoratorsLegacyVueTsx />
    </>
  )
}

createApp(App).mount('#app')
