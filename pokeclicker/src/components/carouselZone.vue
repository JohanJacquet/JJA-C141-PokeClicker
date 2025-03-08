<template>
  <div class="zone-container">
    <v-carousel hide-delimiters :show-arrows="false" class="carousel" height="auto">
      <v-carousel-item>
        <ul>
          <li>
            <img :src="getZoneImg(zoneEnCours)" alt="image correspondant à la route en cours" height="56" width="56"/>
          </li>
          <li>
            <p>{{ zoneEnCours }}</p>
          </li>
        </ul>
      </v-carousel-item>

      <v-btn
        v-if="zoneEnCours > 1"
        @click="changeZone(zoneEnCours-1)"
        class="prev-button"
        icon
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        v-if="zoneEnCours < props.infoJoueur[0].zoneMax"
        @click="changeZone(zoneEnCours+1)"
        class="next-button"
        icon
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-carousel>

    <p class="font-italic zone-txt-restant" v-if="nouvelleZoneFini">{{ compteurZone }} / {{ MAX_POKEMON }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore.js';

const props = defineProps({
  infoJoueur: {
    type: Array,
    required: true,
  },
  changePokemon: {
    type: Function,
    required: true,
  },
  compteurZone: {
    type: Number,
    required: true,
  },
  resetCompteurZone: {
    type: Function,
    required: true,
  }
});

const MAX_POKEMON = 3;
const zoneEnCours = ref(props.infoJoueur[0].zoneEnCours);

// Accéder au store Pokémon via Pinia
const pokemonStore = usePokemonStore();

const nouvelleZoneFini = computed(() => {
  if (zoneEnCours.value === props.infoJoueur[0].zoneMax) {
    if (props.compteurZone < MAX_POKEMON) {
      return true;
    } else {
      props.infoJoueur[0].zoneMax += 1;
      props.resetCompteurZone();

      setTimeout(() => {
        changeZone(zoneEnCours.value + 1);
      }, 200); // Réduit la durée pour rendre l'animation plus réactive
      return false;
    }
  } else {
    return false;
  }
});

async function changeZone(nouvelleZone) {
  // Attente tant que le Pokémon est mort
  while (props.infoJoueur[0].pokemonEnCours.estMort) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Une fois que le Pokémon n'est plus mort, on change de zone
  // pour éviter le bug de changement
  zoneEnCours.value = nouvelleZone;
  props.infoJoueur[0].zoneEnCours = nouvelleZone;
  changeRecontrePokemon(nouvelleZone);
  props.changePokemon(false);
}

function changeRecontrePokemon(indexZone) {
  // Ici, on met à jour les Pokémon disponibles en fonction de la zone
  pokemonStore.setPokemonsAvailable(indexZone);  // Pas besoin de 'zone' ici, on passe 'indexZone + 1'
}

function getZoneImg(indexzone) {
  console.log(indexzone)
  let numeroZone = indexzone;

  // Détermine si c'est un boss (toutes les 10 zones)
  if (numeroZone % 10 === 0) {
    return `../assets/roadIcon/boss/boss${numeroZone / 10}.png`;
  }

  // Détermine la série d'images (chaque série dure 9 zones)
  let numSerie = Math.floor(numeroZone / 10) + 1;
  return `../assets/roadIcon/road${numSerie}.png`;
}
</script>

<style scoped lang="sass">
.zone-txt-restant
  margin-top: 6px

.zone-container
  border: rgba(15,15,15,0.7) 3px solid
  margin: 5px
  background-color: rgba(255,255,255,0.4)
  text-align: center
  color: black

.carousel
  min-width: 300px
  font-size: 18px
  font-weight: bold

ul
  text-decoration: none
  list-style-type: none
  padding: 0
  margin: 0

/* Style des boutons précédents et suivants */
.prev-button, .next-button
  position: absolute
  top: 50%
  transform: translateY(-50%)
  background: rgba(0, 0, 0, 0.8)
  color: white
  border-radius: 50% /* Rendre les boutons ronds */
  width: 50px
  height: 50px
  display: flex
  align-items: center
  justify-content: center

.prev-button
  left: 10px

.next-button
  right: 10px
</style>
