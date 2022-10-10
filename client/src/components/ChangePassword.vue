<template>
  <div>
    <b-button id="settingsButtons" v-b-modal.rePassword variant="outline-light">Reset Password</b-button>
    <b-modal id="rePassword" centered title="Reset Password" hide-header-close hide-footer>
      <template #modal-header="{cancel}" >
        <p style="font-size: 150%">Change Password</p>
        <b-button size="sm" variant="white" @click="cancel()">
          x
        </b-button>
      </template>
      <form v-on:submit="function1">
        <div style="display: flex; flex-direction: column">
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingInput" placeholder="********" required>
            <label>Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingInput" placeholder="********" required>
            <label>New Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingInput" placeholder="********" required>
            <label>Re: New Password</label>
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
export default {
  name: 'ChangePassword',
  methods : {
    function1() {
      console.log("the button is pressed.")
    }
  }
}
</script>

<style scoped>
#settingsButtons {
  font-size: 80%;
  width: 100%;
}
</style>
