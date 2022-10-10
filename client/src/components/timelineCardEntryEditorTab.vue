<template>
  <div class="row g-0">
    <div class="col-md-4">
      <div class="row">
        <img src="../assets/wallpaper1.jpg" class="img-fluid rounded-start" alt="">
      </div>
      <div class="row">
        <div id="dateInfo">
          <input type="text" id="entryDateEditor" style="margin-bottom: 16px" :value="entry.dates.date.split('T')[0]">
          <p class="text-secondary" style="font-size: 12px">Created: {{ entry.dates.created.split('T')[0] }} | Last edited: {{ entry.dates.edited.split('T')[0] }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="form-floating">
        <textarea class="form-control text-bg-dark" :value="entry.text" placeholder="Entry" aria-label="Entry" id="entryText"></textarea>
        <label for="entryText">Entry</label>
      </div>
    </div>
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  data() {
    return {

    }
  },
  methods: {
    updateEntry() {
      const date = document.getElementById('entryDateEditor').value
      const edited = document.getElementById('entryDate').value
      const location = document.getElementById('entryLocation').value
      const text = document.getElementById('entryText').value
      const entry = {
        dates: {
          date,
          edited
        },
        location,
        text
      }

      let url = '/entries' + this.entry._id

      Api.patch(url, JSON.stringify(entry)).then(response => {
        console.log(response.data)
      })
    }
  },
  props: ['entry']
}
</script>
