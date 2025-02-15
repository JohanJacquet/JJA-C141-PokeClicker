<template>
  <div class="container">
    <!-- Onglet Tabs à gauche -->
    <v-card class="onglet">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one" @click="incrementClickCount">PokeShop</v-tab>
        <v-tab value="two">Statistique</v-tab>
        <v-tab value="three">Rebirth ?</v-tab>
      </v-tabs>



      <v-card-text class="pa-0">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one" class="magasin">
            <magasin :infoJoueur="joueur"></magasin>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <div class="stat">
              <statistique :infoJoueur="joueur"></statistique>
            </div>
          </v-tabs-window-item>
          <v-tabs-window-item value="three">
            A venir... !!!!
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>

    <!-- Partie droite -->
    <div class="right-container">
      <carousel-zone class="carousel"></carousel-zone>
      <btn-pokemon class="btn" @changerPokemon="changePokemon" :infoJoueur="joueur" :pokemonStore="pokemonStore"></btn-pokemon>
    </div>
  </div>
</template>

<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
import CarouselZone from "@/components/carouselZone.vue";
import Magasin from "@/components/magasin.vue";
import {usePokemonStore} from "@/stores/pokemonStore.js";
import {onMounted} from "vue";

const props = defineProps({
  videoBg: Boolean,
})

const joueur = reactive([{
  argent: 0,
  attaque: 20,
  critChance: 1,
  critMult: 2,
  zoneEnCours: 1,
  zoneMax: 1,
  pokemonEnCours: null
}])


const pokemonStore = usePokemonStore();


const tab = ref(null);

const emit = defineEmits(["update:videoBg"]); // Permet de mettre à jour la prop dans App.vue
const clickCount = ref(0);


function incrementClickCount() {
  clickCount.value++;

  if (clickCount.value >= 10) {
    emit("update:videoBg", true); // Envoie la mise à jour à App.vue
    clickCount.value = 0; // Reset après activation
  }
}




function changePokemon() {
  if (pokemonStore.pokemons.length > 0) {
    // Récupère un pokemon aléatoire du tableau de pokemon
    const randomPoke = JSON.parse(JSON.stringify(pokemonStore.pokemons[Math.floor(Math.random() * pokemonStore.pokemons.length)]));

    // Recalcule les hp du pokemon en tenant compte de la zone
    randomPoke.hp = randomPoke.stats[0].base_stat * joueur[0].zoneEnCours
    randomPoke.stats[0].base_stat = randomPoke.stats[0].base_stat * joueur[0].zoneEnCours

    // Affecte le nouveau pokemon au pokemon actuelle
    joueur[0].pokemonEnCours = randomPoke;
  }
}


onMounted(async () => {
  await pokemonStore.fetchPokemon()
  changePokemon()
});


</script>

<style scoped lang="sass">
.container
  display: flex
  height: 100vh
  width: 100vw // Prend toute la largeur de l'écran
  align-items: stretch // Étire les enfants pour occuper toute la largeur

.onglet
  background-color: rgba(255, 255, 255, 0.4)
  flex-grow: 1
  max-width: 1000px
  min-width: 1000px
  margin: 10px
  height: 98vh

.right-container
  display: flex
  flex-direction: column
  flex-grow: 1 // Prend tout l'espace restant
  padding: 16px
  align-items: center // Centre les enfants horizontalement
  justify-content: space-between // Répartit les éléments équitablement

.carousel
  align-self: center // Centre horizontalement
  margin-top: 16px // Espace par rapport au haut

.btn
  align-self: center // Centre horizontalement
  margin-top: auto // Centre verticalement avec l'espace dispo
  margin-bottom: auto // Centre verticalement avec l'espace dispo
</style>
