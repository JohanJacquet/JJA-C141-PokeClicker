<template>
  <div class="pokemon-container">
    <v-btn @click="attaquePokemon" class="bg-white pokemon-btn">
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

    <!-- Sacs d'argent au-dessus du Pokémon -->
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
import { onMounted, ref, computed } from "vue";
import { usePokemonStore } from "@/stores/pokemonStore";

const ARGENT_MIN = 2;
const ARGENT_MAX = 5;

const COULEUR_HAUT_HP = 'success';
const COULEUR_MOYEN_HP = 'yellow';
const COULEUR_BAS_HP = 'red';

const props = defineProps({
  pokemonStore: Array,
  infoJoueur: Array
});

const emit = defineEmits(["changerPokemon"]);

const viePokemonAff = ref(100);
const couleurPokemon = ref(COULEUR_HAUT_HP);
const isDying = ref(false);
const moneyBags = ref([]);

// Utilisation du getter pour obtenir un Pokémon aléatoire
const randomPokemon = computed(() => {
  return props.infoJoueur[0]?.pokemonEnCours;
});

function attaquePokemon() {
  if (randomPokemon.value) {
    randomPokemon.value.hp -= props.infoJoueur[0].attaque;
    let pourcentagePv = Math.ceil(randomPokemon.value.hp / randomPokemon.value.stats[0].base_stat * 100);

    viePokemonAff.value = pourcentagePv;

    // Modifie la couleur de la barre de vie selon les PV du Pokémon
    if (pourcentagePv <= 0) {
      isDying.value = true; // Active la classe rouge

      setTimeout(() => {
        isDying.value = false; // Désactive la classe après 300ms
        gagnerArgent();
        emit("changerPokemon");
        viePokemonAff.value = 100;
        couleurPokemon.value = COULEUR_HAUT_HP;
      }, 300); // Durée de l'effet rouge (300ms)
    } else if (pourcentagePv <= 30) {
      couleurPokemon.value = COULEUR_BAS_HP;
    } else if (pourcentagePv <= 50) {
      couleurPokemon.value = COULEUR_MOYEN_HP;
    }
  }
}

function changePokemon() {
  if (props.pokemonStore.pokemons.length > 0) {
    const randomPoke = JSON.parse(JSON.stringify(props.pokemonStore.pokemons[Math.floor(Math.random() * props.pokemonStore.pokemons.length)]));

    randomPoke.hp = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours;
    randomPoke.stats[0].base_stat = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours;

    randomPokemon.value = randomPoke;

    viePokemonAff.value = 100;
    couleurPokemon.value = COULEUR_HAUT_HP;
  }
}

function gagnerArgent() {
  let argentTotal = (Math.floor(Math.random() * (ARGENT_MAX - ARGENT_MIN)) + 1) * props.infoJoueur[0].zoneEnCours;
  let argentSelonPV = Math.ceil((randomPokemon.value.stats[0].base_stat * props.infoJoueur[0].zoneEnCours * 0.005));
  let montantFinal = argentTotal + argentSelonPV;

  for (let i = 0; i < Math.floor(montantFinal / 2); i++) {
    moneyBags.value.push({
      x: Math.random() * 250 + 30, // Position aléatoire autour du Pokémon
      y: Math.random() * 80 + 20,
      amount: 2 // Chaque sac donne 2 pièces
    });
  }
}

function collectMoney(index, amount) {
  props.infoJoueur[0].argent += amount;
  moneyBags.value.splice(index, 1); // Supprime le sac collecté
}

onMounted(async () => {
  await pokemonStore.fetchPokemon();
});
</script>

<style scoped lang="sass">
.dying
  filter: brightness(0.3) sepia(1) hue-rotate(-50deg) saturate(10) !important
  transform: rotate(-20deg) scale(1.1)
  transition: all 0.3s ease

.pokemon-container
  width: 320px
  position: relative

.pokemon-btn
  width: 320px
  min-height: 200px // Ajuste la hauteur selon le contenu
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  font-size: 18px
  position: relative
  overflow: visible // Permet aux éléments de sortir si besoin
  background-color: rgba(255, 255, 255, 0.8) // Pour bien voir le bouton
  border-radius: 10px
  z-index: 1 // Le bouton est en dessous des sacs d'argent

img
  width: 120px
  height: 120px
  position: relative
  z-index: 5

p
  margin-top: 5px
  font-weight: bold
  font-size: 20px
  z-index: 5
  text-align: center

.pokemon-progress
  background-color: rgba(0,0,0,0.7)

.money-bags-container
  position: absolute
  top: -30px // Légèrement au-dessus du bouton
  left: 50%
  transform: translateX(-50%)
  width: 320px
  height: 150px
  z-index: 2 // Les sacs d'argent sont au-dessus du bouton

.money-bag
  position: absolute
  width: 40px
  height: 40px
  animation: fall-animation 0.5s ease-out forwards
  cursor: pointer
  z-index: 20 // Chaque sac d'argent est au-dessus du conteneur

ul
  list-style-type: none // Supprime les puces
  padding: 0 // Supprime le padding par défaut
  margin: 0 // Supprime la marge par défaut

li
  list-style-type: none // Supprime les puces

@keyframes fall-animation
  0%
    transform: translateY(-50px) scale(0.5)
    opacity: 0
  100%
    transform: translateY(0px) scale(1)
    opacity: 1


</style>
