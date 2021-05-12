<template>
  <div>
    <h1>
      example 2　{{ count }}
    </h1>
    <nuxt-link to="/">index</nuxt-link>
    <button @click="() => count++">+</button><br>
    <Sample/>
  </div>
</template>

<script>
import Sample from "@/components/Sample"

export default {
  components: {
    Sample
  },
  head() {
    return {
      title: "other page"
    }
  },
  data() {
    return {
      name: 'vue.js',
      count: 0,
    }
  },
  jsonld() {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      productID: this.count.toString(),
    };
  },
}
</script>
