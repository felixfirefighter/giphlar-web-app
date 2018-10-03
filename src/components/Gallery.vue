<template>
<div>
  <div v-if="initialLoading" class="center">
    <loading ></loading>
  </div>
  <div v-else class="gallery">
    <gallery-image v-for="image in images" :image="image.preview" :index="image.index" :key="image.id"></gallery-image>
  </div>
  <div id="scroll-end">
      <loading v-if="loading"></loading>
  </div>
</div>

</template>

<script>
import GalleryImage from './GalleryImage.vue';
import Loading from './Loading.vue';
import scrollMonitor from 'scrollmonitor';

export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.$store.dispatch('getImages');
  },
  components: {
    GalleryImage,
    Loading
  },
  computed: {
    initialLoading() {
      return this.$store.state.images.length === 0;
    },
    images() {
      return this.$store.state.images;
    }
  },
  mounted() {
    const self = this;
    const scrollEndElem = document.getElementById('scroll-end');
    const watcher = scrollMonitor.create(scrollEndElem);

    watcher.enterViewport(function() {
      self.loading = true;
      self.$store.dispatch('getImages').then(() => {
        self.loading = false;
      });
    });
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

.gallery {
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
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

#scroll-end {
  text-align: center;
  padding: 5px;
}
</style>
