<template>
  <div class="card text-bg-dark" id="timelineCard">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="entryTab" data-bs-toggle="tab" data-bs-target="#entry" type="button" role="tab" aria-controls="entry" aria-selected="true">Entry</button>
        </li>
        <li class="nav-item ms-auto" role="presentation">
          <button class="nav-link" id="entryEditorTab" data-bs-toggle="tab" data-bs-target="#entryEditor" type="button" role="tab" aria-controls="entryEditor" aria-selected="false">Edit</button>
        </li>
      </ul>
    </div>
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
        <div class="tab-content">
          <div class="tab-pane active" id="entry" role="tabpanel" aria-labelledby="entryTab" tabindex="0">
            <div class="card-body">
              <p class="card-text"> {{ entry.text }} </p>
            </div>
          </div>
          <div class="tab-pane" id="entryEditor" role="tabpanel" aria-labelledby="entryEditTab" tabindex="0">
            <div class="card-body">
              <div class="form-floating">
                <textarea class="form-control text-bg-dark" placeholder="Entry" aria-label="Entry" id="entryText"></textarea>
                <label for="entryText">Entry</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
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

#timelineText {
  font-size: 20px;
  /*border: thin #2c3e50 solid;*/
  /*box-shadow: -2px 0 0 #6b6b6b;*/
}

</style>

