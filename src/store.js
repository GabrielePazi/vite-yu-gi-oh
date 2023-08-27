import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
  cards: [],
  selectValue: [],
  resultFoundNumber: 0,
  selectedArchetype: "",
  emptyArchetypeSearch: "",
  isLoading: false
})

export function searchCards() {
  store.isLoading = true

  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";

  axios.get(url).then((response) => {
    store.cards = response.data.data;

    store.resultFoundNumber = store.cards.length
    store.isLoading = false
  });
}

export function initSelect() {
  const urlArchetypes = "https://db.ygoprodeck.com/api/v7/archetypes.php";

  axios.get(urlArchetypes).then((response) => {
    store.selectValue = response.data;
  });
}

export function addCards() {

  store.isLoading = true
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${store.resultFoundNumber}`

  axios.get(url).then((response) => {
    store.cards.push(...response.data.data);

    store.resultFoundNumber = store.cards.length
    store.isLoading = false
  });
}

export function filterArchetypes() {
  if (store.selectedArchetype == "") {
    store.emptyArchetypeSearch = "Inserisci un input valido"
  } else {
    store.emptyArchetypeSearch = ""
  }

  store.isLoading = true

  let urlArchetypes = `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${store.selectedArchetype}`;

  axios.get(urlArchetypes).then((response) => {
    store.cards = response.data.data;

    store.resultFoundNumber = store.cards.length
    store.isLoading = false
  });
}