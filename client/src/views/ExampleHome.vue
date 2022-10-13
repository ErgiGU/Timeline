<template>
  <div>
    <div id="contents">
      <side-exampe></side-exampe>
      <div style=" width: 100%; align-self: center">
        <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
          <b-button class="btn_message" variant="primary" v-on:click="getMessage()">Get Message from Server</b-button>
          <p>Message from the server:<br/>
            {{ message }}</p>
        </b-jumbotron>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {Api} from '@/Api'
import SidebarExample from '@/components/sidebar/SidebarExample'

export default {
  name: 'ExampleHome',
  components: {
    'side-exampe': SidebarExample
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}

</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

#contents {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
