<template>
  <div class="row g-0">
    <div class="col-md-4">
      <div class="row">
        <img src="../assets/wallpaper1.jpg" class="img-fluid rounded-start" alt="">
      </div>
      <div class="row">
        <div id="dateInfo">
          <p>{{ entry.dates.date.split('T')[0] }}</p>
          <p class="text-secondary" style="font-size: 12px">Created: {{ entry.dates.created.split('T')[0] }} | Last edited: {{ entry.dates.edited.split('T')[0] }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <textarea class="card-text" v-model="markdownEntry"></textarea>
      <div v-html="markdownToHTML"></div>
    </div>
  </div>
</template>

<script>
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
  props: ['entry']
}
</script>

<style>

</style>
