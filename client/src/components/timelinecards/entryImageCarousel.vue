<template>
  <div :id="'a'+this.entryID" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../../assets/wallpaper1.jpg" class="d-block w-100" alt="...">
      </div>
      <div v-for="entity of uploadedEntities" :key="entity._id">
        <div class="carousel-item">
          <video :src="entity.file" class="d-block w-100" controls/>
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
      count: 0,
      uploadedEntities: {}
    }
  },
  methods: {
    printID() {
      console.log(this.entryID)
    },
    getEntities() {
      Api.get('/v1/entries/' + this.entryID + '/uploaded_entities_list')
        .then(response => {
          this.uploadedEntities = response.data.sort(function (a, b) {
            return ((b.date_date) - (a.date_date));
          });
        })
    }
  },
  mounted() {
    this.getEntities()
  }
}
</script>

<style>

</style>
