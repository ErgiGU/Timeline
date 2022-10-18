<template>
  <div>
    <b-button id="settingsButtons" variant="outline-light" v-b-modal.modal-1>Change User Information</b-button>
    <b-modal id="modal-1" centered title="Change User Information" hide-footer>
      <template #modal-header="{cancel}">
        <p style="font-size: 150%; line-height: 60%; margin-bottom: 0;">Change User Information</p>
        <b-button size="sm" variant="white" @click="cancel()">
          x
        </b-button>
      </template>
      <form v-on:submit="changeInfo">
        <b-alert v-model="showDismissibleAlert" variant="success" style="line-height: 10px">
          Change Successful!
        </b-alert>
        <div style="display: flex; justify-content: space-evenly;">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="fName" placeholder="First Name">
            <label>First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="lName" placeholder="Surname">
            <label>Last Name</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" placeholder="Email"
                 pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" v-on:keyup="checkIfEmailExists">
          <label>Email address</label>
        </div>
        <div>
          <label for="dateOfBirth">Date of Birth</label>
          <input type="date" class="form-control" id="dateOfBirth" style="line-height: 46px" >
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
  name: 'ChangeUserInfo',
  data() {
    return {
      checked: false,
      showDismissibleAlert: false
    }
  },
  methods: {
    changeInfo(event) {
      const fName = document.getElementById('fName');
      const lName = document.getElementById('lName');
      const email = document.getElementById('email');
      const date_of_birth = document.getElementById('dateOfBirth');

      if (fName.checkValidity() && lName.checkValidity() && email.checkValidity()) {
        let userAccount = {
          "first_name": fName.value,
          "surname": lName.value,
          "email": email.value,
          "date_of_birth": date_of_birth.value
        }
        Api.patch("/v1/userAccounts/" + this.parseJwt(localStorage.token)._id, userAccount)

        this.showDismissibleAlert = true;
        event.preventDefault();

        setTimeout(() => {
          location.reload()
        }, 2000);

      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    }, checkIfEmailExists() {
      const email = document.getElementById('email');
      email.setCustomValidity("");
      Api.post('/v1/checkEmail', {email:email.value}).then(result => {
        if (result.data.message === "Email already exists") {
          console.log(result.data);
          email.setCustomValidity("Email already exists");
        }
      });
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
