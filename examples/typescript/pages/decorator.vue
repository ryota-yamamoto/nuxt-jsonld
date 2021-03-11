<template>
  <div>
    <h1>
      typescript example
    </h1>
    <button @click="() => count++">+</button><br>
    <nuxt-link to="/">Options API</nuxt-link>
    <nuxt-link to="/composition">Composition API</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Jsonld } from 'nuxt-jsonld'
import { WithContext, Product } from 'schema-dts'

@Jsonld
@Component
export default class Sample extends Vue {
  name = 'vue.js'
  count = 0

  jsonld(): WithContext<Product> {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      productID: this.count.toString(),
    };
  }
}
</script>
