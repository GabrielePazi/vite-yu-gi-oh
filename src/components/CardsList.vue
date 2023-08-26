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
      selectValue: [],
      selectedArchetype: "",
      resultFoundNumber: 0,
      emptyArchetypeSearch: ""
    };
  },
  methods: {
    searchCards() {
      const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";

      axios.get(url).then((response) => {
        this.cards = response.data.data;
        console.log(this.cards)

        this.resultFoundNumber = this.cards.length
      });
    },
    addCards() {
      let newUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${this.offsetCard}`
      const url = newUrl;

      axios.get(url).then((response) => {
        this.cards.push(...response.data.data);
        console.log(this.cards)

        this.resultFoundNumber = this.cards.length
      });
    },
    initSelect() {
      const urlArchetypes = "https://db.ygoprodeck.com/api/v7/archetypes.php";

      axios.get(urlArchetypes).then((response) => {
        this.selectValue = response.data;
        console.log(this.selectValue)
      });
    },
    filterArchetypes() {
      if (this.selectedArchetype == "") {
        this.emptyArchetypeSearch = "Inserisci un input valido"
      } else {
        this.emptyArchetypeSearch = ""
      }

      let urlArchetypes = `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${this.selectedArchetype}`;

      axios.get(urlArchetypes).then((response) => {
        this.cards = response.data.data;
        console.log(this.cards)

        this.resultFoundNumber = this.cards.length
      });
    }
  },
  mounted() {
    this.searchCards()
    this.initSelect()
  }
}
</script>

<template>
  <div class="content-container px-5">
    <div class="input-group py-3" style="width: 200px;">
      <select class="form-select" v-model="selectedArchetype">
        <option v-for="archetype in selectValue">{{ archetype.archetype_name }}</option>
      </select>
      <button class="btn bg-white" @click="filterArchetypes()">Search</button>
    </div>

    <div v-if="emptyArchetypeSearch !== ''" class="text-danger bg-light rounded-2 p-1 mb-3" style="width: max-content;">
      {{ emptyArchetypeSearch }}
    </div>

    <div class="bg-dark text-white p-3 d-flex gap-3 align-items-center">
      Found {{ resultFoundNumber }} Cards
      <button v-if="selectedArchetype == ''" class="btn btn-primary" @click="addCards()">Mostra più risultati</button>
    </div>

    <div class="cards-container bg-white p-5 d-flex flex-wrap justify-content-center gap-3">
      <div class="card" style="width: 15rem;" v-for="singleCard in cards">
        <Cards :singleCard="singleCard"></Cards>
      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped></style>