<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  height: 100%;
  background-color: #121212;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d6d9e5;
  overflow-x: hidden;
}
</style>

<script>
</script>
