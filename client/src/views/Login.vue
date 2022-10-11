<template>
  <body>
  <div class="row" id="rowContainer">
    <div class="col-md-4" id="parentContainer">
      <form id="loginForm">
        <h2 class="text-center mb-4">Sign In</h2>

        <div class="form-floating mb-4">
          <input type="email" class="form-control form-control-lg" id="email" placeholder="deeznuts@mail.com"
                 required>
          <label>Email</label>
        </div>

        <div class="form-floating mb-4">
          <input type="password" class="form-control form-control-lg" id="pass" placeholder="b" required>
          <label>Password</label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 150px; height: 50px">Sign In</button>

        <p class="text-center mt-3 mb-2">Don't have an account?
          <router-link to="/Registration" style="color: black">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
  </body>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  methods:{
    login(){
      //const email = document.getElementById("email").value;
      //const pass = document.getElementById('pass').value;

    }
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
  width: auto;
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
  padding: 50px;
  height: 400px;
  margin: auto;
  background-color: rgba(255,255,255,0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
}


</style>
