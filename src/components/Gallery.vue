<template>
  <div class="gallery is-loading">
    <gallery-image v-for="image in images" :image="image"></gallery-image>
  </div>
</template>

<script>
import axios from 'axios';
import GalleryImage from './GalleryImage.vue';

export default {
  data() {
    return {
      images: [],
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;

      const res = await axios.get('https://localhost:44364/api/giphy');

      console.log(res.data.data);

      const newImages = res.data.data.map(elem => {
        return {
          id: elem.id,
          preview: elem.images.preview_gif.url,
          original: elem.images.original.url
        };
      });

      this.images = this.images.concat(newImages);

      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    GalleryImage
  }
};
</script>

<style>
.gallery {
  margin: 0 auto;
  padding: 2rem;
  column-count: 6;
}
</style>
