<template>
  <div class="zone-container">
    <v-carousel v-model="zoneEnCours" hide-delimiters :show-arrows="false" class="carousel" height="auto">
      <v-carousel-item v-for="(zone, index) in props.infoJoueur[0].zoneMax" :key="index">
        <ul>
          <li>
            <img src="../assets/roadIcon/basic.png" alt="image correspondant à la route en cours" height="56" width="56"/>
          </li>
          <li>
            <p>{{ zone }}</p>
          </li>
        </ul>
      </v-carousel-item>

      <v-btn
        v-if="zoneEnCours > 0"
        @click="changeZone(zoneEnCours-1)"
        class="prev-button"
        icon
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        v-if="zoneEnCours < props.infoJoueur[0].zoneMax - 1"
        @click="changeZone(zoneEnCours+1)"
        class="next-button"
        icon
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-carousel>

    <p class="font-italic zone-txt-restant" v-if="nouvelleZoneFini">{{ compteurZone }} / 10</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  pokemonStore: {
    type: Object,
    required: true,
  },
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
  }
});

const MAX_POKEMON = 10
const zoneEnCours = ref(props.infoJoueur[0].zoneEnCours - 1)

const nouvelleZoneFini = computed(() => {

  if (zoneEnCours.value+1 === props.infoJoueur[0].zoneMax) {
    if (props.compteurZone < MAX_POKEMON) {
      return true
    } else {
      props.infoJoueur[0].zoneMax += 1
      props.compteurZone = 0


      setTimeout(() => {
        changeZone(zoneEnCours.value+1)
      }, 200); // Réduit la durée pour rendre l'animation plus réactive
      return false
    }
  } else {
    return false
  }
})



function changeZone(nouvelleZone) {
  zoneEnCours.value = nouvelleZone;
  props.infoJoueur[0].zoneEnCours = nouvelleZone;
  props.changePokemon(false);
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
