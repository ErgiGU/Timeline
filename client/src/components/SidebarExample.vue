<template>
  <div id="App">
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto px-0">
          <div id="sidebar" class="collapse collapse-horizontal show border-end">
            <div id="sidebar-nav" class="border-0 rounded-0 vh-100">
              <div style="display: flex; flex-direction: column; justify-content: center;">
                <b-img style="display: flex; align-self: center; border-radius: 50%; width: 70%"
                       src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
                <p>USERNAME</p>
              </div>
              <div style="font-size: 80%;text-align: left;">
                <p>Name: {{ firstName }} {{ surname }}</p>
                <p>Email: {{ email }}</p>
                <p>Date of Birth: {{ dateBirth }}</p>
              </div>
              <div>
                <div id="cardsStatistics" style="text-align: left; display:flex; flex-direction: column;">
                  <p style="color: lightgrey" class="m-0">
                    Total Entries: {{ totalEntries }}<br>
                    Average Word per Entry: {{ averageWord }}<br>
                    Total Images: {{ totalImages }}<br>
                    Total Size of Entries: {{ totalSize }}
                  </p>
                </div>
              </div>
              <div>
                <b-button id="settings" v-b-toggle.settingsCollapse variant="light" class="w-100">
                  Settings
                  <b-icon width="10px" rotate="180" icon="triangle-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-collapse id="settingsCollapse">
                  <div id="cardSettings" class="py-2">
                    <b-button id="settingsButtons">Change User password</b-button>
                    <b-button id="settingsButtons">Change User Info</b-button>
                    <b-button id="settingsButtons" variant="outline-danger">Delete User</b-button>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
        <div class="col pt-2">
          <button data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1">Sidebar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
