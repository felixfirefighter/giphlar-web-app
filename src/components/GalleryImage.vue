<template>
<div class="image-container">
<img class="image" :src="image.original" alt=""/>

</div>
    
    
</template>

<script>
export default {
  props: ['image']
};
</script>

<style>
.image-container {
  display: inline-block;
  background-color: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

.image {
  margin: 0 auto;
  width: 100%;
  height: auto;
}
</style>
