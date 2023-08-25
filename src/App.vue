<script>
import TheHeader from './components/TheHeader.vue'
import CardsList from './components/CardsList.vue'

export default {
  components: {
    TheHeader,
    CardsList,
  }
}
</script>

<template>
  <TheHeader></TheHeader>

  <main>
    <CardsList></CardsList>
  </main>
</template>

<style lang="scss">
@use './styles/partials/variables' as *;

main {
  background-color: $main-bg;
}
</style>
