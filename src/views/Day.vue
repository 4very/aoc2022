<script setup>
// import Prism Editor
import { ref, onBeforeMount } from 'vue'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

import { useRoute } from 'vue-router'
import daysData from '/days/meta.js'


const route = useRoute()
const dayData = daysData[route.params.dayNumber]

const code = ref('')
onBeforeMount(async () => {
  code.value = (await import(`/days/${route.params.dayNumber}/main.ts?raw`)).default
})

function highlighter(code) {
  return highlight(code, languages.ts) // languages.<insert language> to return html with markup
}

</script>


<template>
  <div class="prose max-w-none text-white">
    <div class="text-2xl text-center mb-4">
      --- Day {{ $route.params.dayNumber }}: {{ dayData.dayTitle }} ---
    </div>
    <prism-editor
      v-model="code"
      class=" leading-5"
      :highlight="highlighter"
      line-numbers
      readonly
    />
  </div>
</template>
