<template>
  <div class="row g-0">
    <div class="col-md-5 g-0" id="topLeftColumn">
      <div id="leftColumn">
        <div class="row">
          <entry-image-carousel :entryID="entry._id"></entry-image-carousel>
        </div>
        <div class="row">
          <input id="formFile" accept="*" type="file" style="width: 50%" v-on:change="this.imageFile">
          <div id="dateInfo">
            <input id="entryDateEditor" :value="entry.date_date.split('T')[0]" style="margin-bottom: 16px;"
                   type="text" class="form-control text-bg-dark">
          </div>
        </div>
        <div class="row" >
          <div class="flex-column">
            <b-button variant="outline-danger" v-on:click="this.deleteAllImages">Delete all Images</b-button>
          </div>
          <div class="flex-column">
            <google-maps :mapLocation="this.entry.location" :entryID="entry._id"/>
          </div>
        </div>
        <div id="dateDisplay">
          <div class="row g-0" style="font-size: 16px">
            Created: {{ entry.created_date.split('T')[0] }}
          </div>
          <div class="row g-0" style="font-size: 16px">
            Last edited: {{ entry.edited_date.split('T')[0] }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-7">
      <div class="form-floating">
        <textarea id="entryTextEditor" v-model="markdownEntry" aria-label="Entry" class="form-control text-bg-dark"
                  placeholder="Entry"></textarea>
        <label for="entryText">Entry</label>
      </div>
      <div>
        <p>Live preview:</p>
        <div v-html="markdownToHTML" id="markdownPreview"></div>
      </div>
      <input type="submit" class="btn btn-primary mt-4" @click="updateEntry">
      <div>
        <b-button variant="outline-danger" v-on:click="this.deleteEntry" style="margin-top: 25px">Delete this entry</b-button>
      </div>
    </div>

  </div>
</template>

<script>
import {Api} from "@/Api";
import GoogleMaps from "@/components/timelinecards/GoogleMaps";
import {marked} from "marked";
import EntryImageCarousel from "@/components/timelinecards/entryImageCarousel";
import DOMPurify from "dompurify";

export default {
  components: {GoogleMaps, EntryImageCarousel},
  data() {
    return {
      markdownEntry: this.entry.text
    }
  },

  props: ['entry'],

  computed: {
    markdownToHTML() {
      return DOMPurify.sanitize(marked(this.markdownEntry))
    }
  },

  methods: {
    deleteAllImages() {
      let entities = []
      Api.get('/v1/entries/' + this.entry._id + '/uploaded_entities_list')
        .then(response => {
          entities = response.data.entities
          entities.forEach((x) => Api.post('/v1/entries/' + this.entry._id + "/uploaded_entities_list/" + x._id + "?_method=DELETE"))
        })
    },

    imageFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      let body;
      let bodyPicture;

      reader.onload = e => {
        bodyPicture = e.target.result
        body = {
          "file": bodyPicture
        }
        Api.post('/v1/entries/' + this.entry._id + "/uploaded_entities_list", body)
      }
      reader.readAsDataURL(file)
    },

    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    },

    updateEntry() {
      let date_date = document.getElementById('entryDateEditor').value
      let created_date = this.entry.created_date
      let location = document.getElementById('entryLocation').value
      let text = document.getElementById('entryTextEditor').value
      let entry = {
        date_date,
        created_date,
        location,
        text
      }

      let url = '/v1/entries/' + this.entry._id

      Api.patch(url, entry).then(response => {
        console.log("Final response")
        console.log(response.data)
        this.$emit('edited', response.data)
      })
    },
    deleteEntry() {
      Api.post('/v1/userAccounts/' + this.parseJwt(localStorage.token)._id + "/entry_list/" + this.entry._id + "?_method=DELETE")
      location.reload()
    }
  },

  mounted() {
    this.$nextTick(() => {
      // DOM updated
      document.getElementById('entryTextEditor').setAttribute(
        "style",
        "height:" + document.getElementById('entryTextEditor').scrollHeight + "px;overflow-y:hidden;"
      );
      document.getElementById('entryTextEditor').addEventListener("input", this.resizeTextarea);
    });
  },

  beforeUnmount() {
    document.getElementById('entryTextEditor').removeEventListener("input", this.resizeTextarea);
  },

  render() {
    return this.$slots[0];
  }
}
</script>

<style>
#markdownPreview {
  border-radius: 5px;
  text-align: left;
  padding: 5px 5px 5px 10px;
  background-color: #4d4d50;
}

#dateInfo {
  align-self: center;
  max-width: 200px;
}
</style>
