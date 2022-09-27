<template>
  <div>
    <div><drop-down></drop-down></div>
    <b-jumbotron header="New Home" lead="This is the new Home" >
      <p>This is the main paragraph</p>
    </b-jumbotron>
  </div>

</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'Home',
  components: {
    'drop-down': SideBar
  }
}
</script>

<style scoped>

</style>
