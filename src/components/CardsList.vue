<script>
import Cards from './Cards.vue'
import Loader from './Loader.vue'
import { store, searchCards, initSelect, addCards, filterArchetypes } from "../store.js"

export default {
  components: {
    Cards,
    Loader
  },
  data() {
    return {
      store
    };
  },
  methods: {
    addCards,
    filterArchetypes
  },
  mounted() {
    searchCards()
    initSelect()
  }
}
</script>

<template>
  <div class="content-container px-5">

    <div class="d-flex align-items-center">
      <div class="input-group py-3" style="width: 200px;">
        <select class="form-select" v-model="store.selectedArchetype">
          <option v-for="archetype in store.selectValue">{{ archetype.archetype_name }}</option>
        </select>
        <button class="btn bg-white" @click="filterArchetypes()">Search</button>
      </div>

      <Loader v-if="store.isLoading"></Loader>
    </div>

    <div v-if="store.emptyArchetypeSearch !== ''" class="text-danger bg-light rounded-2 p-1 mb-3"
      style="width: max-content;">
      {{ store.emptyArchetypeSearch }}
    </div>

    <div class="bg-dark text-white p-3 d-flex gap-3 align-items-center">
      Found {{ store.resultFoundNumber }} Cards
      <button v-if="store.selectedArchetype == ''" class="btn btn-primary" @click="addCards()">Mostra più
        risultati</button>
    </div>

    <div class="cards-container bg-white p-5 d-flex flex-wrap justify-content-center gap-3">
      <div class="card" style="width: 15rem;" v-for="singleCard in store.cards">
        <Cards :singleCard="singleCard"></Cards>
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped></style>