<template>
  <div>
    <h1>
      example 2　{{ count }}
    </h1>
    <nuxt-link to="/">index</nuxt-link>
    <button @click="() => count++">+</button><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'vue.js',
      count: 0,
    }
  },
  jsonld() {
    return {
      '@context': "https://schema.org",
      "@type": "Product2",
      name: this.name,
      count: this.count,
    };
  },
}
</script>
