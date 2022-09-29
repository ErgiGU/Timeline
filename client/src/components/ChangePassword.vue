<template>
<div>
  <b-button id="settingsButtons" v-b-modal.rePassword variant="outline-light">Reset Password</b-button>
  <b-modal id="rePassword" centered title="Reset Password">
    <div style="display: flex; flex-direction: column" >
      <div class="form-floating mb-4" style="font-size: small">
        <input type="password" class="form-control form-control-sm" id="oldPassword">
        <label>Old Password</label>
      </div>
      <div class="form-floating mb-4" style="font-size: small">
        <input type="password" class="form-control form-control-sm" id="newPassword">
        <label>New Password</label>
      </div>
      <div class="form-floating mb-4" style="font-size: small">
        <input type="password" class="form-control form-control-sm" id="newPasswordRe">
        <label>New Password Repeat</label>
      </div>
    </div>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'ChangePassword'
}
</script>

<style scoped>
#settingsButtons{
  font-size: 80%;
  width: 100%;
}
</style>
