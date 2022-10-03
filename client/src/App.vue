<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Timeline-Home</router-link>
      |
      <router-link to="/ExampleHome">Example-Home</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  height: 100vh;
  background-color: #3b3b3b;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d6d9e5;
  overflow: hidden;
}
</style>

<script>

</script>
