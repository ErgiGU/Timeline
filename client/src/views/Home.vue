<template>
  <div style=" display: flex;flex-wrap: nowrap">
    <div>
      <drop-down></drop-down>
    </div>

    <div id="topContainer" class="row">
      <b-jumbotron header="Timeline">
        <b-button class="btn_message" variant="primary" @click="getEntries()">Refresh entries</b-button>
      </b-jumbotron>

      <div id="entryInputContainer" class="container sticky-top">
        <div id="entryInput" class="row g-0 text-bg-dark">
          <div class="col-4">
            <div class="row g-0">
              <input id="entryDate" aria-label="Date" class="form-control text-bg-dark" placeholder="Date" type="date">
            </div>
            <div class="row g-0">
              <div class="form-floating">
                <textarea id="entryLocation" aria-label="Location" class="form-control text-bg-dark"
                          placeholder="Location"></textarea>
                <label for="locationText">Location</label>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="input-group">
              <div class="form-floating">
                <textarea id="entryText" aria-label="Entry" class="form-control text-bg-dark"
                          placeholder="Entry"></textarea>
                <label for="entryText">Entry</label>
              </div>
              <button class="btn btn-outline-light btn-sm" @click="createEntry">Preview Entry</button>
              <button class="btn btn-outline-light btn-sm" @click="createEntry">Create Entry</button>
            </div>
          </div>
        </div>
      </div>

      <div id="timelineContainer" class="container">
        <timeline-card
          v-for="entry of entries"
          :key="entry._id"
          :entry="entry"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {Api} from '@/Api'
import SideBar from '@/components/SideBar'
import timelineCard from "@/components/timelineCard";

export default {
  components: {
    timelineCard,
    'drop-down': SideBar
  },

  name: 'Timeline-Home',
  created() {
    this.getEntries()
  },

  data() {
    return {
      visibleEntries: 0,
      entries: []
    }
  },

  methods: {
    createEntry() {
      const date = document.getElementById('entryDate').value
      const created = document.getElementById('entryDate').value
      const edited = document.getElementById('entryDate').value
      const location = document.getElementById('entryLocation').value
      const text = document.getElementById('entryText').value
      const entry = {
        dates: {
          date,
          created,
          edited
        },
        location,
        text
      }

      let entry_list = []
      let user = {}


      Api.get('userAccounts/:id').then(result => {
        entry_list = result.data.entry_list
        Api.post('/entries', entry).then(response => {
          entry_list.push(response.data._id)
          user = {
            entry_list
          }
          Api.patch('/userAccounts/:id', user)
        })
      })
    },

    getEntry() {
      Api.get('/entries/:id')
        .then(response => {
          this.entries.push(response.data)
        })
    },

    getEntries() {
      Api.get('/entries')
        .then(response => {
          this.entries = response.data.entries;
        })
    },

    getNextEntry() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight;
        if (bottomOfWindow) {
          console.log("bottom of window reached")
          this.getEntries()
        }
      }
    },
  },

  mounted() {
    this.getNextEntry()
  }
}
</script>

<style>
/* Entry container */
#entryInputContainer {
  margin-bottom: 20px;
  padding: 0;
  margin-right: 100px;
  border-radius: 5px;
}

#topContainer {
  margin-right: 100px;
  margin-left: 100px;
}

#entryDate {
  margin: 0;
  border-radius: 5px 0 0 0;
  height: 60px;
}

#entryLocation {
  margin: 0;
  border-radius: 0 0 0 5px;
  min-height: 60px;
  resize: none;
}

#entryText {
  margin: 0;
  border-radius: 0 0 0 0;
  min-height: 120px;
}

.btn_message {
  margin-bottom: 1em;
}

/* Timeline container */
#timelineContainer {
  margin-top: 5px;
  border-radius: 5px;
  padding: 0;
}

/* Scrollbar test */
#entryText::-webkit-scrollbar {
  width: 12px;
  background-color: #b4b4b4;
}

#entryText::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(104, 140, 240, 0.3);
}

#entryText::-webkit-scrollbar-thumb {
  background-color: lightblue;
  border-radius: 5px;
}
</style>
