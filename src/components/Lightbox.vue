<template>

  <div v-if="show">
    <div class="lightbox">
      <div class="container">
        <gallery-image :image="currentImage"></gallery-image>

        <div class="nav">
          <gallery-image :image="prevImage" class="image small"></gallery-image>
          <span class="close" @click="closeLightbox">&times;</span>
          <gallery-image :image="nextImage" class="image small"></gallery-image>
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>
import GalleryImage from './GalleryImage.vue';

export default {
  computed: {
    show() {
      const imageIsSelected = this.$store.state.currentImageIndex !== -1;
      if (imageIsSelected) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }

      return imageIsSelected;
    },
    currentImage() {
      //disable scrolling

      return this.$store.state.images[this.$store.state.currentImageIndex]
        .original;
    },
    prevImage() {
      const image = this.$store.state.images[
        this.$store.state.currentImageIndex - 1
      ];
      if (image) {
        return image.preview;
      }

      return null;
    },
    nextImage() {
      const image = this.$store.state.images[
        this.$store.state.currentImageIndex + 1
      ];
      if (image) {
        return image.preview;
      }

      return null;
    }
  },
  methods: {
    closeLightbox() {
      this.$store.commit('setCurrentImageIndex', -1);
    }
  },
  components: {
    GalleryImage
  }
};
</script>

<style>
.lightbox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 1rem 5vw;
  overflow: auto;
}

@media (min-width: 768px) {
  .lightbox {
    padding: 1rem 10vw;
  }
}

@media (min-width: 992px) {
  .lightbox {
    padding: 1rem 15vw;
  }
}

@media (min-width: 1200px) {
  .lightbox {
    padding: 1rem 30vw;
  }
}

@media (min-width: 1600px) {
  .lightbox {
    padding: 1rem 25vw;
  }
}

.container {
  flex: 1;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.image.small {
  width: 100%;
}

.close {
  cursor: pointer;
  background-color: #fff;
  padding: 1rem 1.5rem;
  font-size: 2rem;
  align-self: center;
  margin: 10px;
  border-radius: 50%;
}
</style>
