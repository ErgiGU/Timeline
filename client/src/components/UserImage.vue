<template>
  <div id="imageSet">
  <b-img id="imgActual" style="border-radius: 50%" :src="imageURL" fluid thumbnail></b-img>
    <p id="text" class="text">
      Change Image
    </p>
    <input accept="image/*" v-on:change="this.imageFile" type="file" id="formFile">
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  name: "UserImage",
  data() {
    return {
      hover: false,
      imageURL: "/assets/profile.png"
    }
  },
  methods: {
    imageFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      let body;
      let bodyPicture;

      reader.onload = e => {
        bodyPicture = e.target.result
        body = {
          "profile_picture": bodyPicture
        }
        Api.patch('/userAccounts/cb3068cd-f1f3-4f6e-a9cb-7cc2517b93c0', body)
        this.imageURL = e.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  mounted() {
    Api.get('/userAccounts/cb3068cd-f1f3-4f6e-a9cb-7cc2517b93c0')
      .then(response => {
        this.imageURL = response.data.profile_picture
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        return this.imageURL = "/assets/profile.png";
      })
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
