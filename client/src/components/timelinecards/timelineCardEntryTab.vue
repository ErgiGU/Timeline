<template>
  <div class="row g-0">
    <div class="col-md-5 g-0" id="topLeftColumn">
      <div id="leftColumn">
        <div class="row">
          <entry-image-carousel :entryID="entry._id"></entry-image-carousel>
        </div>
        <div class="row g-0 justify-content-center" style="font-size: 24px"> {{ entry.date_date.split('T')[0] }} </div>
        <div class="row">
          <google-maps :mapLocation="this.entry.location" :entryID="entry._id"/>
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
      <div id="entryDisplay" v-html="markdownToHTML"></div>
    </div>
  </div>
</template>

<script>
import GoogleMaps from "@/components/timelinecards/GoogleMaps";
import {marked} from "marked";
import EntryImageCarousel from "@/components/timelinecards/entryImageCarousel";
import DOMPurify from "dompurify";

export default {
  data() {
    return {
      markdownEntry: this.entry.text,
    }
  },
  computed: {
    markdownToHTML() {
      return DOMPurify.sanitize(marked(this.markdownEntry))
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
#leftColumn {
  padding: 4px;
  border-radius: 5px;
  background-color: #2a2c2f;
}

#topLeftColumn {
  box-shadow: inset 0 0 0 2px #212529;
}

#entryDisplay {
  padding: 5px;
  text-align: left;
}

#dateDisplay {
  color: #ccced5;
  padding-left: 5px;
}
</style>
