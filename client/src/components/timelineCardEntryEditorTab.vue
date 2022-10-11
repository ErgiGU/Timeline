<template>
  <div class="row g-0">
    <div class="col-md-4">
      <div class="row">
        <img alt="" class="img-fluid rounded-start" src="../assets/wallpaper1.jpg">
      </div>
      <div class="row">
        <div id="dateInfo">
          <input id="entryDateEditor" :value="entry.date_date.split('T')[0]" style="margin-bottom: 16px" type="text">
          <p class="text-secondary" style="font-size: 12px">Created: {{ entry.created_date.split('T')[0] }} | Last
            edited: {{ entry.edited_date.split('T')[0] }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="form-floating">
        <textarea id="entryTextEditor" v-model="markdownEntry" aria-label="Entry" class="form-control text-bg-dark"
                  placeholder="Entry"></textarea>
        <label for="entryText">Entry</label>
      </div>
      <div v-html="markdownToHTML"></div>
      <button type="submit" @click="updateEntry">Done</button>
    </div>
  </div>
</template>

<script>
import {Api} from "@/Api";
import {marked} from "marked";

export default {
  data() {
    return {
      markdownEntry: this.entry.text,
    }
  },
  computed: {
    markdownToHTML() {
      return marked(this.markdownEntry)
    }
  },
  methods: {
    updateEntry() {
      let date = document.getElementById('entryDateEditor').value
      let created = this.entry.created_date
      let location = document.getElementById('entryLocation').value
      let text = document.getElementById('entryTextEditor').value
      let dates = {
        date,
        created
      }
      let entry = {
        dates,
        location,
        text
      }

      let url = '/entries/' + this.entry._id

      Api.patch(url, entry).then(response => {
        console.log("Final response")
        console.log(response.data)
      })
    }
  },
  props: ['entry']
}
</script>
