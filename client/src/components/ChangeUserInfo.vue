<template>
  <div>
    <b-button id="settingsButtons" variant="outline-light" v-b-modal.modal-1>Change User Information</b-button>
    <b-modal id="modal-1" centered title="Change User Information">
      <div style="display: flex; justify-content: space-evenly;" >
        <div class="form-floating mb-4" style="font-size: small">
          <input type="text" class="form-control form-control-sm" id="firstName">
         <label>First Name</label>
        </div>
        <div class="form-floating mb-4" style="font-size: small">
          <input type="text" class="form-control form-control-sm" id="lastName">
          <label>Last Name</label>
        </div>
      </div>
      <div class="mb-4">
        <label for="emailAddress">Email address</label>
        <input type="text" class="form-control" id="emailAddress">
      </div>
      <div>
        <label for="dateOfBirth">Date of Birth</label>
        <input type="date" class="form-control" id="dateOfBirth">
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ChangeUserInfo'
}
</script>

<style scoped>

#settingsButtons{
  font-size: 80%;
  width: 100%;
}

</style>
