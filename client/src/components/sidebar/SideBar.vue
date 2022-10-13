<template>
  <div id="sidebarActual">
    <div style="min-height: 120px;transition-delay: 50ms;" class="collapse collapse-horizontal show"
         id="collapseWidthExample">
      <b-card id="container" class="border-0"></b-card>
      <nav id="sidebar" style="transition: linear; min-width: 250px; display: inline-block; width: 100%">
        <b-sidebar id="sidebar-1"
                   style="transition: linear; min-width: 250px; display: inline-block; width: 100%;"
                   title="Timeline" bg-variant="dark" text-variant="light" width="20%" v-model="collapse"
                   no-header-close no-close-on-esc shadow>
          <template #footer>
            <div class="d-flex bg-light text-light px-3 py-2 w-100">
              <div>
                <b-button id="signOutButton" @click="logOut" variant="primary">Sign Out</b-button>
              </div>
            </div>
          </template>
          <div id="sidebarComponents" class="px-3 py-2 w-100 h-100">
            <div
              style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <user-image style="width: 70%;"></user-image>
              <p>{{ firstName }} {{ surname }}</p>
            </div>
            <div style="font-size: 85%;text-align: left; font-weight: bold">
              <p>Email: {{ email }}</p>
              <p>Date of Birth: {{ dateBirth }}</p>
            </div>
            <div>
              <div id="cardsStatistics"
                   style="text-align: left; display:flex; flex-wrap: wrap; flex-direction: column; border-top: solid; border-bottom: solid; border-top-color: white">
                <p class="statPart">Total Entries: {{ totalEntries }}</p>
                <p class="statPart">Average Word per Entry: {{ averageWord }}</p>
                <p class="statPart">Total Images: {{ totalImages }}</p>
                <p class="statPart">Total Size of Entries: {{ totalSize }}</p>
              </div>
            </div>
            <div>
              <b-button id="settings" v-b-toggle.settingsCollapse variant="light" class="settings w-100"
                        v-on:click="settingsButton()">
                Settings &nbsp;
                <b-icon class="iconSettings" width="6px" rotate="180" icon="triangle-fill"
                        aria-hidden="true"></b-icon>
              </b-button>
              <b-collapse id="settingsCollapse">
                <div id="cardSettings" class="py-2">
                  <change-password></change-password>
                  <change-info></change-info>
                  <delete-user></delete-user>
                </div>
              </b-collapse>
            </div>
          </div>
        </b-sidebar>
      </nav>
    </div>
    <p>
      <button id="sidebarButton" style="display: flex;" class="btn btn-dark" data-bs-toggle="collapse"
              v-b-toggle.sidebar-1 data-bs-target="#collapseWidthExample" aria-expanded="false"
              aria-controls="collapseWidthExample" v-on:click="getUserInfo(); menuButton();">
        <burger-button></burger-button>
      </button>
    </p>
  </div>
</template>

<script>
import ChangeUserInfo from '@/components/sidebar/ChangeUserInfo'
import {Api} from '@/Api'
import ChangePassword from '@/components/sidebar/ChangePassword'
import HamburgerIcon from '@/components/sidebar/HamburgerIcon'
import DeleteAccount from "@/components/sidebar/DeleteAccount";
import UserImage from "@/components/sidebar/UserImage";

export default {
  name: 'SideBar',
  components: {
    'change-info': ChangeUserInfo,
    'change-password': ChangePassword,
    'delete-user': DeleteAccount,
    'burger-button': HamburgerIcon,
    'user-image': UserImage
  },
  data() {
    return {
      totalEntries: 'NaN',
      averageWord: 'NaN',
      totalImages: 'NaN',
      totalSize: 'NaN',
      firstName: 'First-Name',
      surname: 'Surname',
      dateBirth: 'Date-of-Birth',
      email: 'Email',
      menuOpen: true,
      widthCollapse: 0,
      heightCollapse: 0,
      settingsOpen: false,
      collapse: true
    }
  },
  methods: {
    logOut(){
      this.$router.push({name: 'login'});
    },
    getUserInfo() {
      Api.get('/userAccounts/' + this.parseJwt(localStorage.token)._id)
        .then(response => {
          this.firstName = response.data.first_name
          this.surname = response.data.surname
          this.dateBirth = response.data.date_of_birth
          this.email = response.data.email
        })
        .catch(error => {
          this.message = error
        })
    },
    getStatistics() {
      Api.get('/statistics/' + this.parseJwt(localStorage.token)._id)
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
      const menuBtn = document.querySelector('.menu-btn')
      if (screen.width < 768) {
        document.getElementById('sidebar-1').style.width = screen.width * 0.8 + 'px'
        document.getElementById('container').style.width = screen.width * 0.8 + 'px'
        document.getElementById('collapseWidthExample').classList.remove('show')
        this.collapse = false
        menuBtn.classList.remove('open')
        this.menuOpen = false
      } else {
        document.getElementById('sidebar-1').style.width = 250 + 'px'
        document.getElementById('container').style.width = 250 + 'px'
        const container = document.getElementById('collapseWidthExample')
        container.classList.add('show')
        menuBtn.classList.add('open')
        this.menuOpen = true
        this.collapse = true
      }
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
    },
    settingsButton() {
      const settings = document.querySelector('.settings')
      if (!this.settingsOpen) {
        settings.classList.add('open')
        this.settingsOpen = true
      } else {
        settings.classList.remove('open')
        this.settingsOpen = false
      }
    }
  },
  mounted() {
    this.getUserInfo()
    this.getDimensions()
    this.getStatistics()
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
  }
}
</script>

<style scoped>

* {
  font-family: "Times New Roman", serif;
}

.statPart {
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}

.settings {
  transition: all .5s ease-in-out;
}

.iconSettings {
  transition: all .5s ease-in-out;
}

.settings.open .iconSettings {
  rotate: 180deg;
}

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

#signOutButton {
  font-size: 80%;
}

#sidebarButton {
  font-size: 80%;
  z-index: +1;
}

#sidebarActual {
  display: flex;
}

#container {
  outline: transparent;
  background-color: transparent;
  height: 1px;
  width: 250px;
}
</style>
