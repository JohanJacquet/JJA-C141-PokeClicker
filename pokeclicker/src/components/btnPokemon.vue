<template>
  <div class="pokemon-container">
    <v-btn @click="changePokemon" class="bg-white pokemon-btn">
      <img :src="randomPokemon?.image" :alt="randomPokemon?.name" />
      <p>{{ randomPokemon?.name }}</p>
    </v-btn>
    <v-progress-linear
      color="success"
      model-value="100"
      class="pokemon-progress"
      height="15"
      striped
    />
  </div>
</template>



<script setup>
import { onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";

const pokemonStore = usePokemonStore();

// Utilisation du getter pour obtenir un Pokémon aléatoire
const randomPokemon = ref(null);


function changePokemon() {
  if (pokemonStore.pokemons.length > 0) {
    const random = pokemonStore.pokemons[Math.floor(Math.random() * pokemonStore.pokemons.length)];
    randomPokemon.value = random;
  }
}

onMounted(async () => {
  await pokemonStore.fetchPokemon()
  changePokemon()
});

</script>


<style scoped lang="sass">
.pokemon-container
  display: flex
  flex-direction: column
  align-items: center
  width: 260px  // Plus large
  text-align: center

.pokemon-btn
  width: 100%
  height: 120px  // Plus haut
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-transform: none
  font-size: 1.8rem  // Agrandir le texte si besoin

  img

    width: 70px  // Agrandir l’image aussi
    height: 70px
    object-fit: contain

.pokemon-progress
  width: 100%
</style>



