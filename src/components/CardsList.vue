<script>
import Cards from './Cards.vue'
import axios from "axios";

export default {
  components: {
    Cards
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    searchCards() {
      const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";

      axios.get(url).then((response) => {
        this.cards = response.data.data;
        console.log(this.cards)
      });
    },
  },
  mounted() {
    this.searchCards()
  }
}
</script>

<template>
  <div class="content-container px-5">
    <div class="input-group mb-3 py-3" style="width: 200px;">
      <input type="text" class="form-control" placeholder="Search Card" aria-label="Search Card"
        aria-describedby="button-addon2">
      <button class="btn bg-white  border-dark-subtle" type="button" id="button-addon2">v</button>
    </div>

    <div class="bg-dark text-white p-3">
      Found 32 Cards
    </div>

    <div class="cards-container bg-white p-5 d-flex flex-wrap justify-content-center gap-3">
      <div class="card" style="width: 15rem;" v-for="singleCard in cards">
        <Cards :singleCard="singleCard"></Cards>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>