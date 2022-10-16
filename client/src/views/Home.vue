<template>
  <div style="display: flex; justify-content: space-between">
    <drop-down></drop-down>
    <div id="topContainer" class="row" style="">
      <b-jumbotron id="jumboTron" style="position:relative;" header="Timeline">
        <b-button class="btn_message" variant="primary" @click="getEntries()">Refresh entries</b-button>
      </b-jumbotron>

      <div id="entryInputContainer" class="container sticky-top">
        <div id="entryInput" class="row g-0 text-bg-dark">
          <div class="col-3">
            <div class="row g-0">
              <input id="entryDate" aria-label="Date" class="form-control text-bg-dark" placeholder="Date"
                     type="date">
            </div>
            <div class="row g-0">
              <div class="form-floating">
                <textarea id="entryLocation" aria-label="Location" class="form-control text-bg-dark"
                          placeholder="Location"></textarea>
                <label for="locationText">Location</label>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating">
              <textarea id="entryText" aria-label="Entry" class="form-control text-bg-dark"
                        placeholder="Entry"></textarea>
              <label for="entryText">Entry</label>
            </div>
          </div>
          <div class="d-grid gap-2 col-3">
            <button class="btn btn-outline-light" @click="createEntry">Preview Entry</button>
            <button class="btn btn-outline-light" @click="createEntry">Create Entry</button>
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
    <div></div>
  </div>
</template>

<script>
// @ is an alias to /src
import {Api} from '@/Api'
import timelineCard from "@/components/timelinecards/timelineCard";
import SideBar from '@/components/sidebar/SideBar'

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
    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    },

    createEntry() {
      const date_date = document.getElementById('entryDate').value
      const created_date = document.getElementById('entryDate').value
      const edited_date = document.getElementById('entryDate').value
      const location = document.getElementById('entryLocation').value
      const text = document.getElementById('entryText').value
      const entry = {
        date_date,
        created_date,
        edited_date,
        location,
        text
      }

      if (date_date === "" || location === "" || text === "") {
        alert("Please enter some text")
      } else {
        let entry_list = []

        Api.get('/v1/userAccounts/' + this.parseJwt(localStorage.token)._id).then(result => {
          entry_list = result.data.entry_list
          Api.post('/v1/entries', entry).then(response => {
            entry_list.push(response.data._id)
            let entries = {
              'entry_list': entry_list
            }
            this.entries = entry_list
            Api.patch('/v1/userAccounts/' + this.parseJwt(localStorage.token)._id, entries)
            this.getEntries()
          })
        })
      }
    },

    getEntries() {
      Api.get('/v1/userAccounts/' + this.parseJwt(localStorage.token)._id + '/entry_list')
        .then(response => {
          this.entries = response.data.sort(function (a, b) {
            return ((b.date_date) - (a.date_date));
          });
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
    this.$nextTick(() => {
      // DOM updated
      document.getElementById('entryText').setAttribute(
        "style",
        "height:" + document.getElementById('entryText').scrollHeight + "px;overflow-y:hidden;"
      );
      document.getElementById('entryText').addEventListener("input", this.resizeTextarea);
    });
    this.getNextEntry()
  },

  beforeUnmount() {
    document.getElementById('entryText').removeEventListener("input", this.resizeTextarea);
  },

  render() {
    return this.$slots[0];
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

/* Entry container */
#entryInputContainer {
  margin-bottom: 20px;
  padding: 0;
  border-radius: 5px;
}

#topContainer {
  display: flex;
  margin-right: 20px;
  margin-left: 20px
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
