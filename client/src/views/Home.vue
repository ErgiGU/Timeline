<template>
  <div style=" display: flex;flex-wrap: nowrap">
    <div>
      <drop-down></drop-down>
    </div>

    <div class="row" id="topContainer">
      <b-jumbotron header="Timeline">
        <b-button class="btn_message" variant="primary" @click="getEntry()">Get Message from Server</b-button>
        <p>Message from the server:</p>
      </b-jumbotron>

      <div class="container sticky-top" id="entryInputContainer">
        <div class="row g-0" id="entryInput">
          <div class="col-4">
            <div class="row g-0">
              <input type="date" class="form-control" placeholder="Date" aria-label="Date" id="entryDate">
            </div>
            <div class="row g-0">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Location" aria-label="Location"
                          id="entryLocation"></textarea>
                <label for="locationText">Location</label>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="input-group">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Entry" aria-label="Entry" id="entryText"></textarea>
                <label for="entryText">Entry</label>
              </div>
              <button class="btn btn-outline-light" @click="createEntry">Create Entry</button>
            </div>
          </div>
        </div>
      </div>

<!--      <b-carousel-->
<!--        id="carousel-1"-->
<!--        v-model="slide"-->
<!--        controls-->
<!--        indicators-->
<!--        background="#1e1e1e"-->
<!--        img-width="1024"-->
<!--        img-height="480"-->
<!--        style="text-shadow: 1px 1px 2px #3b3b3b;">-->
<!--        <div v-for="(entry, key1) of entries" v-bind:key="key1">-->
<!--          <b-carousel-slide>-->
<!--            <template #img>-->
<!--              <b-img-->
<!--                fluid-grow-->
<!--                src="https://picsum.photos/1024/480/?image=55"-->
<!--                alt="weow"-->
<!--              ></b-img>-->
<!--            </template>-->

<!--            <div class="card" id="carousel-extra-content">-->
<!--              <div class="col-4" id="timelineInfo">-->
<!--                <div class="row" id="imageGallery">-->
<!--                </div>-->
<!--                <div class="row" id="timelineInfoStats">-->
<!--                  <div class="col-4">Date:</div>-->
<!--                  <div class="col-8"> {{ entry.dates.date.split('T')[0] }}</div>-->
<!--                </div>-->
<!--                <div class="row" id="timelineInfoStats">-->
<!--                  <div class="col-4">Created:</div>-->
<!--                  <div class="col-8">{{ entry.dates.created.split('T')[0] }}</div>-->
<!--                </div>-->
<!--                <div class="row" id="timelineInfoStats">-->
<!--                  <div class="col-4">Edited:</div>-->
<!--                  <div class="col-8">{{ entry.dates.edited.split('T')[0] }}</div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-8" id="timelineText">-->
<!--                <p> {{ entry.text }} </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </b-carousel-slide>-->
<!--        </div>-->
<!--        <b-carousel-slide class="carousel-item active" data-bs-interval="4000">-->
<!--            <img src="wallpaper1.jpg" class="d-block w-100" alt="...">-->
<!--            <p> {{ entry.dates.date.split('T')[0] }} </p>-->
<!--            <p> {{ entry.text }} </p>-->
<!--        </b-carousel-slide>-->
<!--      </b-carousel>-->

<!--      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">-->
<!--        <div class="carousel-indicators">-->
<!--          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"-->
<!--                  aria-current="true" aria-label="Slide 1"></button>-->
<!--          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"-->
<!--                  aria-label="Slide 2"></button>-->
<!--          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"-->
<!--                  aria-label="Slide 3"></button>-->
<!--        </div>-->
<!--        <div class="carousel-inner">-->
<!--          <div v-for="(entry, key) of entries" v-bind:key="key">-->
<!--            <div class="carousel-item active" data-bs-interval="10000">-->
<!--              <img src="https://picsum.photos/1024/480/?image=55" class="d-block w-100" alt="...">-->
<!--              <div class="carousel-caption d-none d-md-block">-->
<!--                <h5> {{ entry.dates.date }} </h5>-->
<!--                <p> {{ entry.text }} </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">-->
<!--          <span class="carousel-control-prev-icon" aria-hidden="true"></span>-->
<!--          <span class="visually-hidden">Previous</span>-->
<!--        </button>-->
<!--        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">-->
<!--          <span class="carousel-control-next-icon" aria-hidden="true"></span>-->
<!--          <span class="visually-hidden">Next</span>-->
<!--        </button>-->
<!--      </div>-->


<!--      <div class="container" id="timelineContainer" v-for="(entry, key2) of entries" v-bind:key="key2">-->
<!--        <div class="row" id="timelineRow">-->
<!--          <div class="col-4" id="timelineInfo">-->
<!--            <div class="row" id="imageGallery">-->
<!--              <p>image</p>-->
<!--              <p>image</p>-->
<!--              <p>image</p>-->
<!--              <p>image</p>-->
<!--              <p>image</p>-->
<!--              <p>image</p>-->
<!--            </div>-->
<!--            <div class="row" id="timelineInfoStats">-->
<!--              <div class="col-4">Date:</div>-->
<!--              <div class="col-8"> {{ entry.dates.date.split('T')[0] }}</div>-->
<!--            </div>-->
<!--            <div class="row" id="timelineInfoStats">-->
<!--              <div class="col-4">Created:</div>-->
<!--              <div class="col-8">{{ entry.dates.created.split('T')[0] }}</div>-->
<!--            </div>-->
<!--            <div class="row" id="timelineInfoStats">-->
<!--              <div class="col-4">Edited:</div>-->
<!--              <div class="col-8">{{ entry.dates.edited.split('T')[0] }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-8" id="timelineText">-->
<!--            <p> {{ entry.text }} </p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {Api} from '@/Api'
import {marked} from 'marked'
import SideBar from '@/components/SideBar'
import axios from "axios";

export default {
  components: {
    'drop-down': SideBar
  },

  name: 'Timeline-Home',
  created() {
    this.getEntries()
  },

  data() {
    return {
      previewMarkdown: "",
      entries: []
    }
  },

  computed: {
    markdownToHTML() {
      return marked(this.previewMarkdown)
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

      Api.get('userAccounts/20fc98fa-fd11-4f3f-8b48-f3c4bbbe74ba').then(result => {
        console.log(result.data.entry_list)
        entry_list = result.data.entry_list
      })

      Api.post('/entries', JSON.stringify(entry)).then(response => {
        console.log("created entry id:")
        console.log(response.data._id)
        entry_list.push(response.data._id)
        user = {
          entry_list
        }
        console.log("created string representation:")
        console.log(JSON.stringify(user))
      })

      Api.patch('/userAccounts/20fc98fa-fd11-4f3f-8b48-f3c4bbbe74ba', user).then(response => {
        console.log("response userdata:")
        console.log(response.data)
      })
    },
    getMessage() {
      // Api.get('/userAccounts/92f6059e-af8b-41a8-b595-3e75cdceebd5')
      //   .then(response => {
      //     this.message = response.data.first_name + " " + response.data.surname
      //   })
      //   .catch(error => {
      //     this.message = error
      //   })
    },
    getEntry() {
      Api.get('/entries/7cce7508-030a-411d-bc82-1b21ad903d5c')
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
          Api.get(`/entries`).then(response => {
            this.entries.pop()
            this.entries.push(response.data.results);
            this.entries.reverse()
          });
        }
      }
    },
    createEntry() {
      let date = document.getElementById('entryDate').value
      let text = document.getElementById('entryText').value
      console.log(date + "," + text)
      let entry = {
        text
      }
      console.log(JSON.stringify(entry))
      //Api.post('/entries', "{}")
      axios.Axios
    }
  },

  mounted() {
    this.getNextEntry()
  }
}
</script>

<style>
#entryInputContainer {
  color: white;
  background-color: #6b6b6b;
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
  color: white;
  background-color: #6b6b6b;
  border-radius: 5px 0 0 0;
  height: 60px;
}

#entryLocation {
  margin: 0;
  color: white;
  background-color: #6b6b6b;
  border-radius: 0 0 0 5px;
  height: 60px;
}

#entryText {
  margin: 0;
  color: white;
  border-radius: 0 0 0 0;
  background-color: #6b6b6b;
  min-height: 120px;
}

#entryTextColumn {
  min-height: 120px;
}

#carouselExampleDark {
  margin-right: 100px;
  margin-bottom: 100px;
  padding: 0;
}

#carousel-extra-content {
  background-color: #3b3b3b;
  text-align: left;
  position: center;
  z-index: 20;
}

#carousel-1 {
  background-color: #3b3b3b;
  margin: 50px 50px 0 0;
}


#topRow {
  margin: 0 20px 0 20px;
}

.btn_message {
  margin-bottom: 1em;
}

#timelineContainer {
  margin-top: 5px;
  border: thin #6b6b6b solid;
  border-radius: 5px;
  box-shadow: 2px 2px #312f2f;
}

#timelineRow {
  background-color: #312f2f;
}


#timelineText {
  font-size: 20px;
  /*border: thin #2c3e50 solid;*/
  box-shadow: -2px 0 0 #6b6b6b;
}

#timelineInfo {
  padding-left: 0;
  font-size: 20px;
  /*border: thin #2c3e50 solid;*/
}

#imageGallery {
  margin-left: 0;
  box-shadow: 0 2px 0 #6b6b6b;
}

#timelineInfoStats {
  text-align: left;
  font-size: 12pt;
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
