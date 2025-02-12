<template>
  <div class="pokemon-container">
    <v-btn @click="attaquePokemon" class="bg-white pokemon-btn">
      <ul>
        <li>
          <img :src="randomPokemon?.image" :alt="randomPokemon?.name" />
        </li>
        <li>
          <p>{{ randomPokemon?.name }}</p>
        </li>
      </ul>
    </v-btn>
    <v-progress-linear
      @click="changePokemon"
      :color="couleurPokemon"
      :model-value="viePokemonAff"
      class="pokemon-progress"
      height="20"
      striped
    />
  </div>
</template>



<script setup>
import { onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";


const couleurBien = 'success'
const couleurMoyen = 'yellow'
const couleurMal = 'red'

const props = defineProps({
  pokemonStore: Array,
  infoJoueur: Array
})

const viePokemonAff = ref(100)
const couleurPokemon = ref(couleurBien)

// Utilisation du getter pour obtenir un Pokémon aléatoire
const randomPokemon = ref(null);

function attaquePokemon() {
  randomPokemon.value.hp -= props.infoJoueur[0].attaque
  let pourcentagePv = randomPokemon.value.hp / randomPokemon.value.stats[0].base_stat * 100

  viePokemonAff.value = randomPokemon.value.hp / randomPokemon.value.stats[0].base_stat * 100

  console.log(pourcentagePv)
}

function changePokemon() {
  if (props.pokemonStore.pokemons.length > 0) {
    // Récupère un pokemon aléatoire du tableau de pokemon
    const randomPoke = props.pokemonStore.pokemons[Math.floor(Math.random() * props.pokemonStore.pokemons.length)];

    // Recalcule les hp du pokemon en tenant compte de la zone
    randomPoke.hp = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours
    randomPoke.stats[0].base_stat = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours

    // Affecte le nouveau pokemon au pokemon actuelle
    randomPokemon.value = randomPoke;
    //console.log(props.infoJoueur[0].attaque)
  }
}


</script>


<style scoped lang="sass">
.pokemon-container
  width: 320px


  .pokemon-btn
    width: 320px
    height: 200px
    display: block
    font-size: 18px


img
  display: block
  width: 160px
  height: 160px
  margin: 0 auto

ul
  text-decoration: none
  list-style-type: none

.pokemon-progress
  background-color: rgba(0,0,0,0.7)

</style>



