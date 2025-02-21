<template>
  <div class="pokemon-container">
    <v-btn @click="attaquePokemon" class="bg-white pokemon-btn" @mousemove="updateCursorPosition">
      <ul>
        <li>
          <img :src="randomPokemon?.image" :alt="randomPokemon?.name"
               :class="{ 'dying': isDying }" />
        </li>
        <li>
          <p>{{ randomPokemon?.name }}</p>
        </li>
      </ul>
    </v-btn>
    <v-progress-linear
      :color="couleurPokemon"
      :model-value="viePokemonAff"
      class="pokemon-progress"
      height="20"
      striped
    />
    <div class="damage-text" v-if="damageTextVisible" :style="{ left: cursorPosition.x + 'px', top: cursorPosition.y + 'px' }">
      {{ damageText }}
    </div>
    <div class="money-bags-container">
      <img
        v-for="(bag, index) in moneyBags"
        :key="index"
        src="../assets/lootIcon/moneyBag.png"
        class="money-bag"
        :style="{ left: bag.x + 'px', top: bag.y + 'px' }"
        @mouseenter="collectMoney(index, bag.amount)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";

const ARGENT_MIN = 2
const ARGENT_MAX = 5
const COULEUR_HAUT_HP = 'success'
const COULEUR_MOYEN_HP = 'yellow'
const COULEUR_BAS_HP = 'red'
const MONEY_BAG_MAX = 27

const props = defineProps({
  pokemonStore: {
    type: Object,
    required: true,
  },
  infoJoueur: {
    type: Array,
    required: true,
  },
  dpcJoueur: {
    type: Number,
    required: true,
  },
  dpsJoueur: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(["changerPokemon"])

const viePokemonAff = ref(100)
const couleurPokemon = ref(COULEUR_HAUT_HP)
const isDying = ref(false);
const moneyBags = ref([]); // Stocke les sacs d'argent
const damageText = ref(""); // Texte des dégâts
const damageTextVisible = ref(false); // Indicateur pour afficher/masquer le texte
const cursorPosition = ref({ x: 0, y: 0 }); // Position du curseur

// Utilisation du getter pour obtenir un Pokémon aléatoire
const randomPokemon = computed(() => {
  return props.infoJoueur[0].pokemonEnCours
});

function gagnerArgent() {
  let argentTotal = (Math.floor(Math.random() * (ARGENT_MAX - ARGENT_MIN)) + 1) * props.infoJoueur[0].zoneEnCours
    + Math.ceil((randomPokemon.value.stats[0].base_stat * props.infoJoueur[0].zoneEnCours * 0.005));

  // Ajoute plusieurs sacs d'argent avec des positions aléatoires
  for (let i = 0; i < 3; i++) { // 3 sacs par Pokémon tué
    moneyBags.value.push({
      x: Math.random() * 300, // Position X aléatoire
      y: Math.random() * -250, // Position Y aléatoire
      amount: Math.ceil(argentTotal / 3) // Argent réparti sur 3 sacs
    });
    if (moneyBags.value.length >= MONEY_BAG_MAX) {
      collectMoney(0, moneyBags.value[0].amount)
    }
  }
}

function collectMoney(index, amount) {
  props.infoJoueur[0].argent += amount; // Ajoute l'argent en touchant un sac
  moneyBags.value.splice(index, 1); // Supprime le sac
}

function attaquePokemon() {
  if (!isDying.value) {
    randomPokemon.value.hp -= props.dpcJoueur; // Utilisation de dpcJoueur pour les dégâts infligés
    let pourcentagePv = Math.ceil(randomPokemon.value.hp / randomPokemon.value.stats[0].base_stat * 100)

    viePokemonAff.value = pourcentagePv

    // Afficher les dégâts avec un - devant
    damageText.value = `-${props.dpcJoueur}`;
    damageTextVisible.value = true;

    // Masquer le texte après 500ms pour une animation plus rapide
    setTimeout(() => {
      damageTextVisible.value = false;
    }, 150); // Réduit la durée pour rendre l'animation plus réactive

    // Modifie la couleur de la barre de vie selon les PV manquants du Pokémon
    if (pourcentagePv <= 0) {
      isDying.value = true; // Active la classe rouge

      setTimeout(() => {
        gagnerArgent();
        emit("changerPokemon");
        viePokemonAff.value = 100;
        couleurPokemon.value = COULEUR_HAUT_HP;
        isDying.value = false; // Désactive la classe après 300ms
      }, 300); // Durée de l'effet rouge (300ms)

      viePokemonAff.value = 100
      couleurPokemon.value = COULEUR_HAUT_HP
    } else if (pourcentagePv <= 30) {
      couleurPokemon.value = COULEUR_BAS_HP
    } else if (pourcentagePv <= 50) {
      couleurPokemon.value = COULEUR_MOYEN_HP
    }
  }
}

function updateCursorPosition(event) {
  cursorPosition.value = { x: event.clientX + 10, y: event.clientY + 10 }; // Décale le texte des dégâts de 10px autour du curseur
}
</script>

<style scoped lang="sass">
.money-bags-container
  position: relative
  width: 320px
  height: 300px
  pointer-events: none

.money-bag
  position: absolute
  width: 40px
  height: 40px
  cursor: pointer
  pointer-events: auto
  transition: transform 0.2s ease, opacity 0.2s ease

  &:hover
    transform: scale(1.2) rotate(-10deg)
    opacity: 0.7

.dying
  filter: brightness(0.3) sepia(1) hue-rotate(-50deg) saturate(10) !important
  transform: rotate(90deg) scale(1.1)
  transition: all 0.3s ease

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
  background-color: rgba(0, 0, 0, 0.7)

.damage-text
  position: absolute
  font-size: 20px
  color: red
  font-weight: bold
  pointer-events: none // Empêche l'interaction avec le texte
  z-index: 10
  animation: jumpAndFall 0.5s ease-out // Animation plus rapide

@keyframes jumpAndFall
  0%
    transform: translateY(0) translateX(0)
  50%
    transform: translateY(-30px) translateX(10px) // Le texte saute et se décale à droite
  100%
    transform: translateY(30px) translateX(20px) // Le texte retombe plus loin à droite
    opacity: 0 // Le texte disparaît
</style>
