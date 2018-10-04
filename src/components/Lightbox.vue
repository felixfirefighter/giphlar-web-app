<template>

  <div v-if="show">
    <div class="lightbox">
      <div class="container">
        <gallery-image :image="currentImage" :index="currentIndex"></gallery-image>

        <div class="nav">
          <gallery-image :image="prevImage" :index="currentIndex - 1" class="image small"></gallery-image>
          <span class="close" @click="closeLightbox">&times;</span>
          <gallery-image :image="nextImage" :index="currentIndex + 1" class="image small"></gallery-image>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import GalleryImage from './GalleryImage.vue';

export default {
  computed: {
    currentIndex() {
      return this.$store.state.currentImageIndex;
    },
    show() {
      const imageIsSelected = this.currentIndex !== -1;
      if (imageIsSelected) {
        //disable scrolling for body
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }

      return imageIsSelected;
    },
    currentImage() {
      const image = this.$store.state.images[this.currentIndex];
      if (image) {
        return image.original;
      }

      return null;
    },
    prevImage() {
      const image = this.$store.state.images[this.currentIndex - 1];
      if (image) {
        return image.preview;
      }

      return null;
    },
    nextImage() {
      const image = this.$store.state.images[this.currentIndex + 1];
      if (image) {
        return image.preview;
      }

      // final image of the current list, call getImages to add more images
      this.$store.dispatch('getImages').then(() => {
        return this.$store.state.images[this.currentIndex + 1].preview;
      });
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
  width: 100vw;
  height: 100vh;
  padding: 1rem 5vw;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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

.container {
  flex: 1;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.image.small {
  width: 25%;
  margin: 0;
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
