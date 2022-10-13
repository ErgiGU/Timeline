<template>
  <div class="container vh-100">
    <div class="row needs-validation justify-content-center" id="rowContainer">
      <div class="col-md-4" id="parentContainer">
        <form id="registrationForm" v-on:submit="function1">
          <h2 class="text-center text-white mb-3" style="top: 100px; ">Create an account</h2>
          <b-alert v-model="showDismissibleAlert" variant="success" style="line-height: 10px">
            Registration Successful!
          </b-alert>

          <div class="form-floating mb-4">
            <input type="text" class="form-control form-control-lg" id="fName" placeholder="a" required>
            <label>First Name</label>
          </div>

          <div class="form-floating mb-4">
            <input type="text" class="form-control form-control-lg" id="lName" placeholder="b" required>
            <label>Last Name</label>
          </div>

          <div class="form-floating mb-4">
            <input type="email" class="form-control form-control-lg" id="email"
                   v-on:keyup="checkIfEmailExists"
                   placeholder="exampleEmail"
                   required title="Please enter a valid email.">
            <label>Email</label>
          </div>

          <div class="form-floating mb-4">
            <input type="password" class="form-control form-control-lg" id="pass" title="
            Password must contain: Minimum 8 characters at least 1 alphabetic character and 1 number"
                   placeholder="b" required=""
                   pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$">
            <label>Password</label>
          </div>

          <div class="form-floating mb-4">
            <input type="password" class="form-control form-control-lg" id="confPass"
                   v-on:keyup="checkIfPassMatches"
                   placeholder="b" required>
            <label>Confirm Password</label>
          </div>

          <div class="form-check d-flex mb-2">
            <input class="form-check-input me-2" type="checkbox" v-on:change="checkBox()" value=""
                   id="tosCheckbox"/>
            <label class="form-check-label text-white">I accept the <a href="#!" class="text-body "><u>Terms
              of
              Service</u></a>
            </label>
          </div>

          <button class="btn btn-primary text-white sign-up disabled" id="btn1"
                  style="width: 150px; height: 50px; align-self: center ">Sign Up
          </button>

          <p class="text-center mt-1 mb-2 text-white">Already have an account?
            <router-link to="/" style="color: black">Login here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import {Api} from '@/Api'

export default {
  name: "App",
  data() {
    return {
      checked: false,
      showDismissibleAlert: false
    }
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

      if (fName.checkValidity() && lName.checkValidity() && email.checkValidity() && pass.checkValidity() &&
        confPass.checkValidity()) {
        let userAccount = {
          "first_name": fName.value,
          "surname": lName.value,
          "email": email.value
        }

        Api.post("/userAccounts", userAccount).then(res => {
          let userPass = {
            "_id": res.data._id,
            "password": pass.value
          }
          Api.post("/userPasswords", userPass);
        });

        this.showDismissibleAlert = true;
        event.preventDefault();

        setTimeout(() => {
          this.$router.push({name: 'login'});
        }, 3000);

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
    },
    checkIfEmailExists() {
      const email = document.getElementById('email');
      let body = {
        'email': email.value
      }
      email.setCustomValidity("");
      Api.post('/checkEmail', body).then(result => {
        if (result.data === "Email already exists") {
          console.log(result.data);
          email.setCustomValidity("Email already exists");
        }
      });
    },
  }
}

</script>

<style>

body {
  background: linear-gradient(-45deg, #6b6b6b, #213FAF, #C9CDDD);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

html, body {
  height: 100vh;
  align-items: center;
}

#rowContainer {
  height: 100%;
  padding: 10px;
  margin: auto;
}

#registrationForm {
  display: flex;
  flex-direction: column;
  vertical-align: auto;
}


#parentContainer {
  vertical-align: middle;
  display: table-cell;
  width: 600px;
  padding: 50px;
  height: 700px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
}


</style>
