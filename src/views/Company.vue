<template>
  <div>
    <div v-if="company">
      <h1>{{ company }}</h1>
    </div>
    <p v-else class="no__task">Task not found</p>
  </div>
</template>


<script>
export default {
  computed: {
    company() {
      return this.$store.getters.companyBySymbol(this.$route.params.symbol);
    },
  },
};
</script>

<style scoped>
</style>