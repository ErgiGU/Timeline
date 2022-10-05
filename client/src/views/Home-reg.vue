<template>
  <div class="row needs-validation"  id="rowContainer" >
    <div class="col-md-4" id="parentContainer">
      <form id="registrationForm" v-on:submit="function1">
        <h2 class="text-center mb-5 text-white">Create an account</h2>

        <div class="form-floating mb-4">
          <input type="text" class="form-control form-control-lg" id="fName" placeholder="a" required>
          <label>First Name</label>
          <div class="valid-feedback text-danger">Looks good!</div>
        </div>

        <div class="form-floating mb-4">
          <input type="text" class="form-control form-control-lg" id="lName" placeholder="b" required>
          <label>Last Name</label>
        </div>

        <div class="form-floating mb-4">
          <input type="email" class="form-control form-control-lg" id="email" placeholder="exampleEmail"
                 required pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" title="Please enter a valid email.">
          <label>Email</label>
        </div>

        <div class="form-floating mb-4">
          <input type="password" class="form-control form-control-lg" id="pass"  title="
          Password must contain: Minimum 8 characters at least 1 alphabetic character and 1 number"
                 placeholder="b" required=""
                 pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$">
          <label>Password</label>
        </div>

        <div class="form-floating mb-4">
          <input type="password" class="form-control form-control-lg" id="confPass" v-on:keyup="checkIfPassMatches"
                 placeholder="b" required>
          <label>Confirm Password</label>
        </div>

        <div class="form-check d-flex mb-2">
          <input class="form-check-input me-2" type="checkbox" v-on:change="checkBox()" value="" id="tosCheckbox"/>
          <label class="form-check-label text-white">I accept the <a href="#!" class="text-body "><u>Terms of Service</u></a>
          </label>
        </div>

        <button class="btn1 btn submits text-white sign-up disabled" id="btn1"
                style="width: 150px; height: 50px">Sign Up</button>
        <p class="text-center mt-3 mb-2 text-white">Already have an account?
          <router-link to="/" style="color: black">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
export default {
  name: "App",
  data() {
    return {checked: false}
  },
  methods: {
    function1(event) {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      //const forms = document.querySelectorAll('.needs-validation');
      const fName = document.getElementById('fName');
      const lName = document.getElementById('lName');
      const email = document.getElementById('email');
      const pass = document.getElementById('pass');
      const confPass = document.getElementById('confPass');
      /*    console.log(fName.checkValidity());
      console.log(lName.checkValidity());
      console.log(email.checkValidity());
      console.log(pass.checkValidity());
      console.log(confPass.checkValidity());*/

      if (fName.checkValidity() && lName.checkValidity() && email.checkValidity() && pass.checkValidity() &&
        confPass.checkValidity()) {
        console.log(fName.value);
        console.log(lName.value);
        console.log(email.value);
        console.log(pass.value);
        console.log(confPass.value);

      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    checkBox() {
      const okButton = document.getElementById('btn1')
      if (!this.checked) {
        okButton.classList.remove('disabled')
        this.checked = true
      } else {
        okButton.classList.add('disabled')
        this.checked = false
      }
    },
    checkIfPassMatches() {
      const pass = document.getElementById('pass');
      const confPass = document.getElementById('confPass');
      if (pass.value !== confPass.value) {
        confPass.setCustomValidity("Passwords don't match");
      } else {
        confPass.setCustomValidity('');
      }
    }
  }
}


</script>

<style>


#rowContainer {
  height: 100%;
  padding: 10px;
  margin: auto;
}

#registrationForm {
  width: auto;
  vertical-align: auto;
}

body {
  height: 100vh;
  align-items: center;
  background: #3b3b3b;
}

#parentContainer {
  vertical-align: middle;
  display: table-cell;
  width: 600px;
  padding: 50px;
  height: 700px;
  margin: auto;
  background-color: rgba(255,255,255,0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
}
#btn1{
  background-color: cornflowerblue;
}

</style>
