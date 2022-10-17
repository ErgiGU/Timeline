<template>
  <div>
    <b-button id="settingsButtons" v-b-modal.rePassword variant="outline-light">Change Password</b-button>
    <b-modal id="rePassword" centered title="Reset Password" hide-header-close hide-footer>
      <template #modal-header="{cancel}">
        <p style="font-size: 150%; margin-bottom: 0">Change Password</p>
        <b-button size="sm" variant="white" @click="cancel()">
          x
        </b-button>
      </template>
      <form v-on:submit="function1">
        <b-alert v-model="showDismissibleAlert" variant="success" style="line-height: 10px">
          Change Successful!
        </b-alert>
        <div style="display: flex; flex-direction: column">
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="checkingPass" placeholder="********"
                   v-on:keyup="checkPassword" required>
            <label>Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="pass" placeholder="********"
                   title="Password must contain: Minimum 8 characters at least 1 alphabetic character and 1 number"
                   pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required>
            <label>New Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="confPass" placeholder="********"
                   v-on:keyup="checkIfPassMatches" required>
            <label>Confirm New Password</label>
          </div>
        </div>
        <div style="width: 100%; display: flex; justify-content: center; padding-top: 10px">
          <button class="btn btn-primary" style="display: flex;" type="submit">Change</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  name: 'ChangePassword',
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
      const checkPass = document.getElementById('checkingPass');
      const pass = document.getElementById('pass');
      const confPass = document.getElementById('confPass');
      if (pass.checkValidity() && confPass.checkValidity() && checkPass.checkValidity()) {
        const user = this.parseJwt(localStorage.token);
        Api.post("/v1/userPasswords/" + user._id + "?_method=PUT", {password: pass.value});
        this.showDismissibleAlert = true;
        event.preventDefault();
        setTimeout(() => {
          location.reload()
        }, 1000);
      } else {
        event.preventDefault();
        event.stopPropagation();
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
    checkPassword() {
      const checkPass = document.getElementById("checkingPass")
      const user = this.parseJwt(localStorage.token);
      Api.post("/v1/verifyPassword", {_id: user._id, password: checkPass.value}).then((response) => {
        if (response.data.message === "Correct password") {
          checkPass.setCustomValidity("");
        }
      },(failResponse) => {
        console.log(failResponse.response.status);
        if(failResponse.response.status === 404){
          checkPass.setCustomValidity("Invalid password")
        }else {
          checkPass.setCustomValidity("");
        }
      })
    },
  }
}
</script>

<style scoped>
#settingsButtons {
  font-size: 80%;
  width: 100%;
}
</style>
