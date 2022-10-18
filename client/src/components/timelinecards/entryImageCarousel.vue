<template>
  <div :id="'a'+this.entryID" class="carousel carousel-dark slide" data-bs-interval="false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <video v-if="this.entityURL.includes('video')" :src="this.entityURL" class="d-block w-100" controls/>
        <img v-else-if="this.entityURL.includes('image')" :src="this.entityURL" class="d-block w-100">
      </div>
      <div v-for="entity of uploadedEntities" :key="entity._id">
        <div :id="entity._id" class="carousel-item">
          <video v-if="entity.file.includes('video')" :src="entity.file" class="d-block w-100" controls/>
          <img v-else-if="entity.file.includes('image')" :src="entity.file" class="d-block w-100"/>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" :data-bs-target="'#a'+this.entryID" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" :data-bs-target="'#a'+this.entryID" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  props: {
    entryID: String
  },
  data() {
    return {
      uploadedEntities: {},
      entityURL: "https://joy.videvo.net/videvo_files/video/free/2018-01/large_watermarked/171124_H1_006_preview.mp4"
    }
  },
  methods: {
    getEntries() {
      let count = 0
      Api.get('/v1/entries/' + this.entryID + '/uploaded_entities_list')
        .then(response => {
          this.uploadedEntities = response.data.entities.sort(function (a, b) {
            return ((b.date_date) - (a.date_date));
          });
          if (this.uploadedEntities.length > 0) {
            if(count === 0) {
              this.entityURL = this.uploadedEntities.pop().file
            }
            count++
          }
        })
    }
  },
  mounted() {
    this.getEntries()
  }
}
</script>

<style>

</style>
