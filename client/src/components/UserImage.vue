<template>
  <div id="imageSet">
  <b-img id="imgActual" style="border-radius: 50%" :src=this.imageURL fluid thumbnail></b-img>
    <p id="text" class="text">
      Change Image
    </p>
    <input accept="image/*" class="form-control" v-on:change="this.onFile" type="file" id="formFile">
  </div>
</template>

<script>
export default {
  name: "UserImage",
  data() {
    return {
      hover: false,
      imageURL: "https://media.tenor.com/kHcmsxlKHEAAAAAC/rock-one-eyebrow-raised-rock-staring.gif"
    }
  },
  methods: {
    onFile(e) {
      const files = e.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (console.log(reader.result))
    }
  }
}
</script>

<style scoped>

#imageSet {
  -webkit-filter: brightness(100%);
  border-radius: 50%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#imageSet:hover {
  -webkit-filter: brightness(50%);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#imageSet:hover #text{
  visibility: visible;
  opacity: 1;
}

#text {
  position: absolute;
  padding: 0;
  margin: 0;
  opacity: 0;
  visibility: hidden;
}

#formFile {
  height: 100%;
  width: 100%;
  opacity: 0;
  border-radius: 50%;
  z-index: 1;
  position: absolute;
}

</style>
