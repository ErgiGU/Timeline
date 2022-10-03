<template>
  <div id = "sidebarActual">
    <div style="min-height: 120px;transition-delay: 50ms;" class="collapse collapse-horizontal show" id="collapseWidthExample">
      <b-card id = "container" class="border-0"></b-card>
      <nav id="sidebar" style="transition: linear">
        <b-sidebar id="sidebar-1" style="transition: linear" title="Timeline" bg-variant="dark" text-variant="light" width="20%" no-header-close no-close-on-esc visible shadow>
          <template #footer>
            <div class="d-flex bg-light text-light px-3 py-2 w-100">
              <div><b-button id="signOutButton" variant="primary">Sign Out</b-button></div>
            </div>
          </template>
          <div id = "sidebarComponents" class="px-3 py-2 w-100 h-100" >
            <div style="display: flex; flex-direction: column; justify-content: center;">
              <b-img style="display: flex; align-self: center; border-radius: 50%; width: 70%" src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
              <p>USERNAME</p>
            </div>
            <div style="font-size: 80%;text-align: left;">
              <p>Name: {{firstName}} {{surname}}</p>
              <p>Email: {{email}}</p>
              <p>Date of Birth: {{dateBirth}}</p>
            </div>
            <div>
              <div id="cardsStatistics" style="text-align: left; display:flex; flex-direction: column;" >
                <p style="color: lightgrey" class="m-0">
                  Total Entries: {{totalEntries}}<br>
                  Average Word per Entry: {{averageWord}}<br>
                  Total Images: {{totalImages}}<br>
                  Total Size of Entries: {{totalSize}}
                </p>
              </div>
            </div>
            <div>
              <b-button id = "settings" v-b-toggle.settingsCollapse variant="light" class = "w-100">
                Settings <b-icon width="10px" rotate="180" icon="triangle-fill" aria-hidden="true"></b-icon>
              </b-button>
              <b-collapse id="settingsCollapse">
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
    <p>
      <button id="sidebarButton" style="display: flex;" class="btn btn-dark" data-bs-toggle="collapse" v-b-toggle.sidebar-1 data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample" v-on:click="getUserInfo(); menuButton();">
        <burger-button></burger-button>
      </button>
    </p>
  </div>
</template>

<script>
import ChangeUserInfo from '@/components/ChangeUserInfo'
import { Api } from '@/Api'
import ChangePassword from '@/components/ChangePassword'
import HamburgerIcon from '@/components/HamburgerIcon'

export default {
  name: 'SideBar',
  components: {
    'change-info': ChangeUserInfo,
    'change-password': ChangePassword,
    'burger-button': HamburgerIcon
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
      email: 'Email',
      menuOpen: true,
      widthCollapse: 0,
      heightCollapse: 0
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
    },
    getDimensions() {
      const container = document.getElementById('container')
      this.widthCollapse = document.getElementById('sidebar-1').clientWidth + 'px'
      container.style.width = this.widthCollapse
      console.log('this is the size' + container.style.width)
    },
    menuButton() {
      const menuBtn = document.querySelector('.menu-btn')
      if (!this.menuOpen) {
        menuBtn.classList.add('open')
        this.menuOpen = true
      } else {
        menuBtn.classList.remove('open')
        this.menuOpen = false
      }
    }
  },
  mounted() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
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
  flex-direction:  column;
}

#sidebarComponents {
  display: flex;
  flex-wrap: nowrap;
  flex-direction:  column;
  justify-content: space-evenly;
}

#settingsButtons {
  font-size: 80%;
}

#signOutButton{
  font-size: 80%;
}

#sidebarButton{
  font-size: 80%;
  z-index: +1;
}

#sidebarActual{
  display: flex;
}

#container{
  outline: transparent;
  background-color: transparent;
  height: 1px;
}
</style>
