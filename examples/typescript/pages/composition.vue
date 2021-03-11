<template>
  <div>
    <h1>
      typescript example
    </h1>
    <button @click="() => count++">+</button><br>
    <nuxt-link to="/">Options API</nuxt-link>
    <nuxt-link to="/decorator">Class API</nuxt-link>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@nuxtjs/composition-api'
import { WithContext, Product, Thing } from 'schema-dts'
import { useJsonld } from 'nuxt-jsonld'

export default defineComponent({
  setup() {
    const count = ref(0)
    const name = 'vue.js'

    useJsonld(() => ({
      '@context': "https://schema.org",
      "@type": "Product",
      name,
      productID: count.value.toString(),
    }))

    return { count, name }
  },
})
</script>
