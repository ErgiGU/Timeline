<template>
  <div id="timelineCard" class="card text-bg-dark">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item" role="presentation">
          <button id="TimelineCardEntryTab" :aria-selected="{active:currentTab==='TimelineCardEntryTab'}" :class="{active:currentTab==='TimelineCardEntryTab'}"
                  class="nav-link" role="tab" type="button"
                  @click="currentTab='TimelineCardEntryTab'">Entry
          </button>
        </li>
        <li class="nav-item ms-auto" role="presentation">
          <button id="TimelineCardEntryEditorTab" :aria-selected="{active:currentTab==='TimelineCardEntryEditorTab'}"
                  :class="{active:currentTab==='TimelineCardEntryEditorTab'}" class="nav-link" role="tab"
                  type="button" @click="currentTab='TimelineCardEntryEditorTab'">Edit
          </button>
        </li>
      </ul>
    </div>
    <component :is="currentTab" :entry="entry" v-on:edited="(editedEntry) => updateEntry(editedEntry)" class="tab"></component>
  </div>
</template>

<script>
import TimelineCardEntryTab from "@/components/timelinecards/timelineCardEntryTab";
import TimelineCardEntryEditorTab from "@/components/timelinecards/timelineCardEntryEditorTab";

export default {
  components: {
    TimelineCardEntryEditorTab,
    TimelineCardEntryTab
  },
  data() {
    return {
      currentTab: 'TimelineCardEntryTab',
      tabs: ['TimelineCardEntryTab', 'TimelineCardEntryEditorTab']
    }
  },
  props: ['entry'],
  methods: {
    updateEntry(updatedEntry) {
      // eslint-disable-next-line vue/no-mutating-props
      this.entry = updatedEntry;
    }
  }
}
</script>

<style>
/* Card styling */
#timelineCard {
  border: thin #6b6b6b solid;
  border-radius: 5px;
  min-height: 400px;
  margin-bottom: 30px;
  padding-bottom: 0;
}

</style>

