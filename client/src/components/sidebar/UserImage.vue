<template>
  <div id="imageSet">
    <b-img id="imgActual" :src="this.imageURL" fluid style="border-radius: 50%" thumbnail></b-img>
    <p id="text" class="text">
      Change Image
    </p>
    <input id="formFile" accept="image/*" type="file" v-on:change="this.imageFile">
  </div>
</template>

<script>
import {Api} from "@/Api";

export default {
  name: "UserImage",
  data() {
    return {
      hover: false,
      imageURL: "https://construct-static.com/images/v1027/r/uploads/tutorial/0/images/17449/windows-8-user-account_v650.jpg"
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
        Api.patch('/userAccounts/' + this.parseJwt(localStorage.token)._id, body)
        this.imageURL = e.target.result
      }
      reader.readAsDataURL(file)
    },
    setInitialImage() {
      Api.get('/userAccounts/' + this.parseJwt(localStorage.token)._id)
        .then(response => {
          if (response.data.profile_picture !== null && response.data.profile_picture !== "random") {
            this.imageURL = response.data.profile_picture
          }
        })
    }
  },
  mounted() {
    this.setInitialImage()
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

#imageSet:hover #text {
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
