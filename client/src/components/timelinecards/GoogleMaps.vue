<template>
  <div>
    <div>
      {{ mapLocation }}
    </div>
    <b-button variant="success" v-b-modal='this.entryID'>
      <b-icon icon="geo-alt-fill"></b-icon>
    </b-button>
    <b-modal class="mapModal" :id="this.entryID" centered hide-footer hide-header>
      <div style="width: 400px; height: 400px">
        <iframe
          id="mapFrame"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          :src=this.urlSource>
        </iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "GoogleMaps",
  props: {
    mapLocation: String,
    entryID: String
  },
  data() {
    return {
      urlSource: "https://www.google.com/maps/embed/v1/place?key=AIzaSyDAdbVkSNE9wwCc90QbmQRHTaZbW3goIGc&q="
    }
  },
  methods: {
    mapsLocation() {
      console.log(this.urlSource)
      this.urlSource = this.urlSource + this.mapLocation
    }
  },
  mounted() {
    this.mapsLocation()
  },
  unmounted() {
  }
}
</script>

<style scoped>

.mapModal {
  position: relative;
  overflow: hidden;
}

#mapFrame {
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
