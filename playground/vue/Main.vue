<template>
  <h1>Vue version {{ version }}</h1>
  <div class="comments"><!--hello--></div>
  <pre>{{ time as string }}</pre>
  <div class="hmr-block">
    <Hmr />
  </div>
  <div class="hmr-tsx-block">
    <HmrTsx />
  </div>
  <HmrCircularReference name="test" />
  <TypeProps msg="msg" bar="bar" :id="123" />
  <TypePropsTsx msg="msg" bar="bar" />
  <WithQuery />
  <Syntax />
  <PreProcessors />
  <PreProcessorsHmr />
  <CssModules />
  <Assets />
  <CustomBlock />
  <SrcImport />
  <ExternalSrcImport />
  <Slotted>
    <div class="slotted">this should be red</div>
  </Slotted>
  <ScanDep />
  <TsImport />
  <Suspense>
    <AsyncComponent />
  </Suspense>
  <SetupImportTemplate />
  <WorkerTest />
  <Url />
  <TsGeneric msg="hello" />
  <DefaultLangs />
  <PreCompiled />
  <PreCompiledExternalScoped />
  <PreCompiledExternalCssModules />
  <ParserOptions />
  <ExportTypeProps1 msg="msg" />
  <ExportTypeProps2 msg="msg" />
</template>

<script setup lang="ts">
import { version, defineAsyncComponent } from 'vue'
import Hmr from './Hmr.vue'
import HmrTsx from './HmrTsx.vue'
import WithQuery from './WithQuery.vue?with-query'
import Syntax from './Syntax.vue'
import PreProcessors from './PreProcessors.vue'
import PreProcessorsHmr from './PreProcessorsHmr.vue'
import CssModules from './CssModules.vue'
import Assets from './Assets.vue'
import CustomBlock from './CustomBlock.vue'
import SrcImport from './src-import/SrcImport.vue'
import ExternalSrcImport from '#external/src-import/SrcImport.vue'
import Slotted from './Slotted.vue'
import ScanDep from './ScanDep.vue'
import TsImport from './TsImport.vue'
import AsyncComponent from './AsyncComponent.vue'
import SetupImportTemplate from './setup-import-template/SetupImportTemplate.vue'
import WorkerTest from './worker.vue'
import { ref } from 'vue'
import Url from './Url.vue'
import TypeProps from './TypeProps.vue'
import TypePropsTsx from './TypePropsTsx.vue'
import DefaultLangs from './DefaultLangs.vue'
import PreCompiled from './pre-compiled/foo.vue'
import PreCompiledExternalScoped from './pre-compiled/external-scoped.vue'
import PreCompiledExternalCssModules from './pre-compiled/external-cssmodules.vue'
import ParserOptions from './ParserOptions.vue'
import HmrCircularReference from './HmrCircularReference.vue'
import TreeShakeScopedStyle from './TreeShakeScopedStyle.vue'

// NOTE: this function is not used intentionally
function foo() {
  console.log(TreeShakeScopedStyle)
}

import ExportTypeProps1 from './ExportTypeProps1.vue'
import ExportTypeProps2 from './ExportTypeProps2.vue'

const TsGeneric = defineAsyncComponent(() => import('./TsGeneric.vue'))

const time = ref('loading...')

window.addEventListener('load', () => {
  setTimeout(() => {
    const [entry] = performance.getEntriesByType('navigation')
    time.value = `loaded in ${entry.duration.toFixed(2)}ms.`
  }, 0)
})
</script>
