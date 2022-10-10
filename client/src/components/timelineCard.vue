<template>
  <div class="card text-bg-dark" id="timelineCard">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item" role="presentation">
          <button class="nav-link" :class="{active:currentTab==='TimelineCardEntryTab'}" id="TimelineCardEntryTab" @click="currentTab='TimelineCardEntryTab'" type="button" role="tab" :aria-selected="{active:currentTab==='TimelineCardEntryTab'}">Entry</button>
        </li>
        <li class="nav-item ms-auto" role="presentation">
          <button class="nav-link" :class="{active:currentTab==='TimelineCardEntryEditorTab'}" id="TimelineCardEntryEditorTab" @click="currentTab='TimelineCardEntryEditorTab'" type="button" role="tab" :aria-selected="{active:currentTab==='TimelineCardEntryEditorTab'}">Edit</button>
        </li>
      </ul>
    </div>
    <component :is="currentTab" :entry="entry" class="tab"></component>
  </div>
</template>

<script>
import TimelineCardEntryTab from "@/components/timelineCardEntryTab";
import TimelineCardEntryEditorTab from "@/components/timelineCardEntryEditorTab";

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
  props: ['entry']
}
</script>

<style>
/* Card styling */
#timelineCard {
  border: thin #6b6b6b solid;
  border-radius: 5px;
  min-height: 400px;
  margin-bottom: 30px;
}

</style>

