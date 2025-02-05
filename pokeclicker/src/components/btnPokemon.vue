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
  width: 320px


  .pokemon-btn
    width: 320px
    height: 200px
    display: block


img
  display: block
  margin: 0 auto
p
  display: block
  margin-top: 5px
</style>



