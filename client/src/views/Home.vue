<template>
  <div style=" display: flex;flex-wrap: nowrap">
    <div>
      <drop-down></drop-down>
    </div>

    <div class="row" style="width: 100%">
      <div class="col-10">
        <b-jumbotron header="Timeline">
          <b-button class="btn_message" variant="primary" @click="getEntries()">Get Message from Server</b-button>
          <p>Message from the server:<br/>
            {{ message }}</p>
        </b-jumbotron>

        <div class="container" id="entryInputContainer">
          <div class="row g-0" id="entryInput">
            <div class="col-sm-3">
              <input type="date" class="form-control" placeholder="Date" aria-label="Date" id="entryDate">
            </div>
            <div class="col">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Entry" aria-label="Entry" id="entryText"></textarea>
                <label for="entryText">Entry</label>
              </div>
            </div>
          </div>
        </div>


        <div class="container" id="timelineContainer" v-for="entry of entries" v-bind:key="entry">
          <div class="row" id="timelineRow">
            <div class="col-3" id="timelineInfo">
              <div class="row" id="imageGallery">image</div>
              <div class="row" id="timelineInfoStats">
                <div class="col-4">Date:</div>
                <div class="col-8"> {{ entry.dates.date.split('T')[0] }}</div>
              </div>
              <div class="row" id="timelineInfoStats">
                <div class="col-4">Created:</div>
                <div class="col-8">{{ entry.dates.created.split('T')[0] }}</div>
              </div>
              <div class="row" id="timelineInfoStats">
                <div class="col-4">Edited:</div>
                <div class="col-8">{{ entry.dates.edited.split('T')[0] }}</div>
              </div>
            </div>
            <div class="col-8" id="timelineText">
              <p> {{ entry.text }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {Api} from '@/Api'

import SideBar from '@/components/SideBar'

export default {
  components: {
    'drop-down': SideBar
  },

  name: 'ExampleHome',
  created() {
    this.getEntries()
  },

  data() {
    return {
      message: 'none',
      entryDate: 'none',
      entryText: 'none',
      entries: []
    }
  },

  methods: {
    getMessage() {
      Api.get('/userAccounts/92f6059e-af8b-41a8-b595-3e75cdceebd5')
        .then(response => {
          this.message = response.data.first_name + " " + response.data.surname
        })
        .catch(error => {
          this.message = error
        })
    },
    getEntry() {
      Api.get('/entries/c67efd77-3c83-403f-8513-004829b6c2d4')
        .then(response => {
          this.entryDate = response.data.dates.date.split('T')[0];
          this.entryText = response.data.text;
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
          Api.get(`/entries`).then(response => {
            this.entries.push(response.data.results);
          });
        }
      }
    }
  },

  mounted() {
    this.getNextEntry()
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

#timelineContainer {
  margin-top: 5px;
  border: thin #bed2e1 solid;
  border-radius: 5px;
  box-shadow: 2px 2px #93a3af;
}

#entryInputContainer {
  padding: 0;
  margin-bottom: 20px;
}

#timelineText {
  font-size: 20px;
  /*border: thin #2c3e50 solid;*/
  box-shadow: -2px 0 0 #bed2e1;
}

#timelineInfo {
  padding-left: 0;
  font-size: 20px;
  /*border: thin #2c3e50 solid;*/
}

#imageGallery {
  margin-left: 0;
  box-shadow: 0 2px 0 #bed2e1;
}

#timelineInfoStats {
  text-align: left;
  font-size: 12pt;
}

#entryDate {
  height: 60px;
}

#entryText {
  min-height: 50px;
}

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
