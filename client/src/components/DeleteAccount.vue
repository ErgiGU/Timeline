<template>
  <div>
    <b-button id="settingsButtons" variant="outline-danger" v-b-modal.deleteAccount>Delete User</b-button>
    <b-modal id="deleteAccount" class="modal" centered title="Delete Account" hide-header-close>
      <div style="display: flex; flex-direction: column">
        <p>Warning! This action is not revertable. Your account with all it's entries and images will be permanently deleted!</p>
        <div class="form-floating mb-4" style="font-size: small">
          <input type="email" class="form-control form-control-sm" id="email">
          <label>Email</label>
        </div>
        <div class="form-floating mb-4" style="font-size: small">
          <input type="password" class="form-control form-control-sm" id="password">
          <label>Password</label>
        </div>
        <div class="form-floating mb-4" style="font-size: small">
          <input type="password" class="form-control form-control-sm" id="passwordRe">
          <label>Password Repeat</label>
        </div>
        <b-form-checkbox class="checkbox" name="agreeCheck" v-on:change="checkBox()">
          &nbsp; <b-icon class="iconSettings" width="20px" icon="exclamation-triangle" aria-hidden="true"></b-icon>
          I would like to permanently delete my account
          <b-icon class="iconSettings" width="20px" icon="exclamation-triangle" aria-hidden="true"></b-icon>
        </b-form-checkbox>
      </div>
      <template #modal-footer="{ cancel, ok}">
        <b-button size="sm" variant="white" style="border-color: black;" @click="cancel()">
          Cancel
        </b-button>
        <b-button id="okButtons" class="okButton disabled" size="sm" variant="danger" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
.iconSettings {
  animation: blinkingBackground 2s infinite;
}

@keyframes blinkingBackground{
  0%		{ color: darkred;}
  25%		{ color: red;}
  75%		{ color: red;}
  100%	{ color: darkred;}
}

#settingsButtons {
  font-size: 80%;
  width: 100%;
}
</style>
