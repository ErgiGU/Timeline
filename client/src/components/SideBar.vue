<template>
  <div class="" id="sidebarActual">
    <nav id="sidebar">
      <b-button id="sidebarButton" v-b-toggle.sidebar-1 v-on:click="getUserInfo()">Sidebar</b-button>
      <b-sidebar id="sidebar-1" title="Timeline" bg-variant="dark" text-variant="light" backdrop backdrop-variant="dark"
                 width="20%" no-header-close shadow>
        <template #footer>
          <div class="d-flex bg-light text-light px-3 py-2 w-100">
            <div>
              <b-button id="signOutButton" variant="primary">Sign Out</b-button>
            </div>
          </div>
        </template>
        <div id="sidebarComponents" class="px-3 py-2 w-100 h-100">
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <b-img style="display: flex; align-self: center; border-radius: 50%; width: 70%"
                   src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            <p>USERNAME</p>
          </div>
          <div style="font-size: 80%;text-align: left">
            <p>Name: {{ firstName }} {{ surname }}</p>
            <p>Email: {{ email }}</p>
            <p>Date of Birth: {{ dateBirth }}</p>
          </div>
          <div>
            <b-button id="statistics" v-b-toggle.statisticsCollapse variant="light" class="w-75"
                      v-on:click="getStatistics()">Statistics
            </b-button>
            <b-collapse id="statisticsCollapse" accordion="sideCollapse">
              <div id="cardsStatistics" class="py-2" style="text-align: left">
                <p>Total Entries: {{ totalEntries }}</p>
                <p>Average Word per Entry: {{ averageWord }}</p>
                <p>Total Images: {{ totalImages }}</p>
                <p>Total Size of Entries: {{ totalSize }}</p>
              </div>
            </b-collapse>
          </div>
          <div>
            <b-button id="settings" v-b-toggle.settingsCollapse variant="light" class="w-75">Settings</b-button>
            <b-collapse id="settingsCollapse" accordion="sideCollapse">
              <div id="cardSettings" class="py-2">
                <change-password></change-password>
                <change-info></change-info>
                <b-button id="settingsButtons" variant="outline-danger">Delete User</b-button>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-sidebar>
    </nav>
  </div>
</template>

<script>
import ChangeUserInfo from '@/components/ChangeUserInfo'
import {Api} from '@/Api'
import ChangePassword from '@/components/ChangePassword'

export default {
  name: 'SideBar',
  components: {
    'change-info': ChangeUserInfo,
    'change-password': ChangePassword
  },
  data() {
    return {
      totalEntries: 'NaN',
      averageWord: 'NaN',
      totalImages: 'NaN',
      totalSize: 'NaN',
      firstName: 'First Name',
      surname: 'Surname',
      dateBirth: 'Date of Birth',
      email: 'Email'
    }
  },
  methods: {
    getUserInfo() {
      Api.get('/userAccounts/:id')
        .then(response => {
          this.firstName = response.data.totalEntries
          this.surname = response.data.averageWord
          this.dateBirth = response.data.totalImages
          this.email = response.data.totalSize
        })
        .catch(error => {
          this.message = error
        })
    },
    getStatistics() {
      Api.get('/statistics/')
        .then(response => {
          this.totalEntries = response.data.totalEntries
          this.averageWord = response.data.averageWord
          this.totalImages = response.data.totalImages
          this.totalSize = response.data.totalSize
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>

#cardsStatistics {
  font-size: 75%;
}

#cardSettings {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
}

#sidebarComponents {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-evenly;
}

#settingsButtons {
  font-size: 80%;
}

#signOutButton {
  font-size: 80%;
}

#sidebarButton {
  font-size: 80%;
}

#sidebarActual {
  display: flex;
}
</style>
