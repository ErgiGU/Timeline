<template>
  <div class="row" id="rowContainer">
    <div class="col-md-4" id="parentContainer">
      <form id="loginForm"  >
        <h2 class="text-center mb-2 text-white" style="line-height: 2">Sign In</h2>
        <b-alert v-model="showDismissibleAlert" variant="danger" style="line-height: 10px">
          Invalid password/email
        </b-alert>

          <div class="form-floating mb-4">
            <input type="email" class="form-control form-control-lg" id="email" placeholder="deeznuts@mail.com"
                   required>
            <label>Email</label>
          </div>

          <div class="form-floating mb-4">
            <input type="password" class="form-control form-control-lg" id="pass" placeholder="b" required>
            <label>Password</label>
          </div>

          <button type="submit" class="btn btn-primary align-self-center" @click="login" style="width: 150px; height: 50px">Sign
            In
          </button>

        <p class="text-center mt-2 mb-2 text-white">Don't have an account?
          <router-link to="/Registration" style="color: black">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import {Api} from '@/Api'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      showDismissibleAlert: false
    }
  },

  methods: {
    login(event) {
      const email = document.getElementById("email");
      const pass = document.getElementById('pass');
      if(email.checkValidity() && pass.checkValidity()) {
        event.preventDefault()
        Api.post('/v1/login', {
          email: email.value,
          password: pass.value
        }).then((response) => {
          if(response.data.message === "Success" ){
            this.$router.push ('/Home');
            localStorage.token = response.data.token;

          }
        },(failResponse) => {
          if(failResponse.response.status === 404){
            this.showDismissibleAlert = true;
          }
        })
        }
    },
  }
}
</script>

<style scoped>
#rowContainer {
  height: 100%;
  padding: 10px;
  margin: auto;
}

#loginForm {
  display: flex;
  flex-direction: column;
  vertical-align: auto;
}

Html, body {
  height: 100vh;
  align-items: center;
}

#parentContainer {
  vertical-align: middle;
  display: table-cell;
  width: 600px;
  padding: 10px 50px 50px;
  height: 400px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
}


</style>
