<template>
  <div>
    <b-button id="settingsButtons" variant="outline-light" v-b-modal.modal-1>Change User Information</b-button>
    <b-modal id="modal-1" centered title="Change User Information" hide-footer>
      <template #modal-header="{cancel}" >
        <p style="font-size: 150%">Change User Information</p>
        <b-button size="sm" variant="white" @click="cancel()">
          x
        </b-button>
      </template>
      <form>
        <div style="display: flex; justify-content: space-evenly;">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="First Name">
            <label>First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Surname">
            <label>Last Name</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="Email"
                 pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$">
          <label>Email address</label>
        </div>
        <div>
          <label for="dateOfBirth">Date of Birth</label>
          <input type="date" class="form-control" id="dateOfBirth">
        </div>
        <div style="width: 100%; display: flex; justify-content: center; padding-top: 10px">
          <button class="btn btn-primary" style="display: flex;" type="submit">Change</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ChangeUserInfo'
}
</script>

<style scoped>

#settingsButtons {
  font-size: 80%;
  width: 100%;
}

</style>
