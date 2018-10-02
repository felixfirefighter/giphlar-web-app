<template>
<div>
  <div v-if="loading" class="center">
    <img src="../assets/loading.gif" alt="Loading..." class="loading">
  </div>
  <div v-else class="gallery">
    <gallery-image v-for="image in images" :image="image.preview" :index="image.index" :key="image.id"></gallery-image>
  </div>
</div>

</template>

<script>
import GalleryImage from './GalleryImage.vue';

export default {
  created() {
    this.$store.dispatch('getImages');
  },
  components: {
    GalleryImage
  },
  computed: {
    loading() {
      return this.$store.state.images.length === 0;
    },
    images() {
      return this.$store.state.images;
    }
  }
};
</script>

<style>
.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 8rem;
  height: auto;
}

.gallery {
  margin: 0 auto;
  padding: 2rem;
  column-count: 2;
}

@media (min-width: 768px) {
  .gallery {
    column-count: 3;
  }
}

@media (min-width: 992px) {
  .gallery {
    column-count: 4;
  }
}

@media (min-width: 1200px) {
  .gallery {
    column-count: 5;
  }
}

@media (min-width: 1600px) {
  .gallery {
    column-count: 6;
  }
}
</style>
