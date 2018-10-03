<template>
  <div class="navbar">
    <div class="brand">
      <i class="fas fa-globe-asia"></i>
      <span class="text">Giphlar</span>
    </div>
    <div @click="refresh" class="btn-refresh">
      <span :class="{
        fas: true,
        'fa-sync-alt': true,
        'fa-spin': refreshing}"></span>
    </div>
    
  </div>
</template>

<script>
import randomWords from 'random-words';

export default {
  data() {
    return {
      refreshing: false
    };
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.$store.commit('changeSearch', randomWords());
      this.$store.commit('clearImages');
      this.$store.dispatch('getImages').then(() => {
        this.refreshing = false;
      });
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  color: #3498db;
  position: fixed;
  z-index: 2;
  padding: 1rem;
  background-color: #fff;
  width: 100%;
}

.brand {
  display: flex;
}

.brand .text {
  text-transform: uppercase;
  margin: 0 10px;
  font-weight: 700;
}

.btn-refresh {
  cursor: pointer;
}
</style>
