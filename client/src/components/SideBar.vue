<template>
  <div class="" id = "sidebarActual">
    <nav id="sidebar">
      <b-button id="sidebarButton" v-b-toggle.sidebar-1>Sidebar</b-button>
      <b-sidebar id="sidebar-1" title="Timeline" bg-variant="dark" text-variant="light" backdrop backdrop-variant="dark" width="20%" shadow>
        <template #footer>
          <div class="d-flex bg-light text-light px-3 py-2 w-100">
            <div><b-button id="signOutButton" variant="primary">Sign Out</b-button></div>
          </div>
        </template>
        <div id = "sidebarComponents" class="px-3 py-2 w-100 h-100" >
          <div>
            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            <p>USERNAME</p>
          </div>
          <div>
            <b-button id = "statistics" v-b-toggle.statisticsCollapse variant="light" class = "w-75">Statistics</b-button>
            <b-collapse id="statisticsCollapse"  accordion="sideCollapse">
              <b-card id="cardsStatistics" text-variant="dark" class="px-0 py-0">
                <p class="card-text1">Total Entries: </p>
                <p class="card-text2">Average Word per Entry: </p>
                <p class="card-text3">Total Images: </p>
                <p class="card-text4">Total Size of Entries: </p>
              </b-card>
            </b-collapse>
          </div>
          <div>
            <b-button id = "settings" v-b-toggle.settingsCollapse variant="light" class = "w-75">Settings</b-button>
            <b-collapse id="settingsCollapse" accordion="sideCollapse">
              <b-card id="hello">
                <div id="cardSettings">
                  <b-button id="settingsButtons" variant="outline-dark">Reset Password</b-button>
                  <b-button id="settingsButtons" variant="outline-dark">Change User Information</b-button>
                  <b-button id="settingsButtons" variant="outline-danger">Delete User</b-button>
                </div>
              </b-card>
            </b-collapse>
          </div>
        </div>
      </b-sidebar>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style scoped>

#cardsStatistics {
  font-size: 75%;
}

#cardSettings {
  display: flex;
  flex-wrap: nowrap;
  flex-direction:  column;
}

#sidebarComponents {
  display: flex;
  flex-wrap: nowrap;
  flex-direction:  column;
  justify-content: space-evenly;
}
#settingsButtons{
  font-size: 80%;
}

#signOutButton{
  font-size: 80%;
}

#sidebarButton{
  font-size: 80%;
}

#sidebarActual{
  display: flex;
}
</style>
