<template>
  <div>
    <h1>
      typescript example
    </h1>
    <button @click="() => count++">+</button><br>
    <nuxt-link to="/decorator">Class API</nuxt-link>
    <nuxt-link to="/composition">Composition API</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { WithContext, Product } from 'schema-dts'

type Data = {
  name: string,
  count: number,
}

export default Vue.extend({
  data(): Data {
    return {
      name: 'vue.js',
      count: 0,
    }
  },
  jsonld(): WithContext<Product> {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      productID: this.count.toString(),
    };
  },
})
</script>
