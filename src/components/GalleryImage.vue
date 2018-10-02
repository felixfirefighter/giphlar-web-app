<template>
<div>
  <div v-if="image != null" class="image-container">
    <img class="image" :src="image" @click="showLightbox(index)" alt=""/>
  </div>
</div>

    
</template>

<script>
export default {
  props: ['image', 'index'],
  methods: {
    showLightbox(index) {
      this.$store.commit('setCurrentImageIndex', index);
    }
  }
};
</script>

<style>
.image-container {
  cursor: pointer;
  display: inline-block;
  background-color: #eee;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 100%;
}

.image {
  margin: 0 auto;
  width: 100%;
  height: auto;
}
</style>
