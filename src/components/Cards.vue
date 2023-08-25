<script>
export default {
  props: {
    singleCard: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <img :src="singleCard.card_images[0].image_url" class="card-img-top" alt="">
  <div class="card-body">
    <h6 class="card-title text-white text-center">{{ singleCard.name }}</h6>
    <p class="text-center my-3">{{ singleCard.archetype }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.card-body {
  background-color: $main-bg;
}
</style>