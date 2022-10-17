<template>
  <div>
    <b-button id="settingsButtons" variant="outline-danger" v-b-modal.deleteAccount>Delete User</b-button>
    <b-modal id="deleteAccount" class="modal" centered title="Delete Account" hide-footer>
      <template #modal-header="{cancel}">
        <p style="font-size: 150%">Delete Account</p>
        <b-button size="sm" variant="white" @click="cancel()">
          x
        </b-button>
      </template>
      <form v-on:submit="function1">
        <div style="display: flex; flex-direction: column">
          <p>Warning! This action is not revertable. Your account with all it's entries and images will be
            permanently
            deleted!</p>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="pass" placeholder="********" v-on:keyup="this.checkPassword" required>
            <label>Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="confPass" placeholder="********" v-on:keyup="checkIfPassMatches"
                   required>
            <label>Password Repeat</label>
          </div>
          <b-form-checkbox class="checkbox" name="agreeCheck" v-on:change="checkBox()">
            &nbsp;
            <b-icon class="iconSettings" width="20px" icon="exclamation-triangle"
                    aria-hidden="true"></b-icon>
            I would like to permanently delete my account
            <b-icon class="iconSettings" width="20px" icon="exclamation-triangle"
                    aria-hidden="true"></b-icon>
          </b-form-checkbox>
        </div>
        <div style="width: 100%; display: flex; justify-content: center; padding-top: 10px">
          <button id="okButtons" class="okButton btn btn-primary disabled" v-on:click="deleteAccount"
                  style="display: flex;" type="submit">Delete
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  name: "DeleteAccount",
  data() {
    return {
      checked: false
    }
  },
  methods: {
    checkBox() {
      const okButton = document.querySelector('.okButton')
      if (!this.checked) {
        okButton.classList.remove('disabled')
        this.checked = true
      } else {
        okButton.classList.add('disabled')
        this.checked = false
      }
    },
    function1(event) {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      //const forms = document.querySelectorAll('.needs-validation');
      const pass = document.getElementById('pass');
      const confPass = document.getElementById('confPass');
      if (pass.checkValidity() && confPass.checkValidity()) {
        const user = this.parseJwt(localStorage.token);
        Api.post("/v1/userAccounts/" + user._id + "?_method=DELETE");
        Api.post("/v1/userPasswords/" + user._id + "?_method=DELETE");
        event.preventDefault();
        this.$router.push({name: 'login'});
        location.reload()
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
      const checkPass = document.getElementById("pass")
      const user = this.parseJwt(localStorage.token);
      Api.post("/v1/verifyPassword", {_id: user._id, password: checkPass.value}).then((response) => {
        if (response.data.message === "Correct password") {
          checkPass.setCustomValidity("");
        } else {
          checkPass.setCustomValidity("Invalid password")
        }
      },(failResponse) => {
          console.log(failResponse.response.status);
          if(failResponse.response.status === 404){
            checkPass.setCustomValidity("Invalid password")
            console.log("wowingggg")
          }else {
            checkPass.setCustomValidity("");
          }
        }
      )
    },
  }
}
</script>

<style scoped>
.iconSettings {
  animation: blinkingBackground 2s infinite;
}

@keyframes blinkingBackground {
  0% {
    color: darkred;
  }
  25% {
    color: red;
  }
  75% {
    color: red;
  }
  100% {
    color: darkred;
  }
}

#settingsButtons {
  font-size: 80%;
  width: 100%;
}
</style>
