<template>
<h1> Helloooooo</h1>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Initial-home",
  mounted() {
    this.$router.push({name:'login'});
  }
}
</script>

<style scoped>

</style>
