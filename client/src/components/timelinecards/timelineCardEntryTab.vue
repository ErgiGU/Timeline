<template>
  <div class="row g-0">
    <div class="col-md-5 g-0">
      <div class="row">
        <entry-image-carousel></entry-image-carousel>
      </div>
      <div class="row g-0 justify-content-center" style="font-size: 24px"> {{ entry.dates.date.split('T')[0] }} </div>
      <div class="border-bottom">Location: </div>
      <div class="row">
        <google-maps :mapLocation="this.entry.location" :entryID="entry._id"/>
      </div>
      <div id="dateDisplay">
        <div class="row text-secondary g-0" style="font-size: 12px">
          Created: {{ entry.dates.created.split('T')[0] }}
        </div>
        <div class="row text-secondary g-0" style="font-size: 12px">
          Last edited: {{ entry.dates.edited.split('T')[0] }}
        </div>
      </div>
    </div>
    <div class="col-md-7">
      <div id="entryDisplay" v-html="markdownToHTML"></div>
    </div>
  </div>
</template>

<script>
import GoogleMaps from "@/components/timelinecards/GoogleMaps";
import {marked} from "marked";
import EntryImageCarousel from "@/components/timelinecards/entryImageCarousel";

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
  props: ['entry'],
  components: {
    EntryImageCarousel,
    'google-maps': GoogleMaps
  }
}
</script>

<style>
#entryDisplay {
  padding: 5px;
  text-align: left;
}

#dateDisplay {
  padding-left: 5px;
}
</style>
