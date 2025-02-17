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
    <v-progress-linear
      @click="changePokemon"
      :color="couleurPokemon"
      :model-value="viePokemonAff"
      class="pokemon-progress"
      height="20"
      striped
    />
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
import {onMounted} from "vue";
import {usePokemonStore} from "@/stores/pokemonStore";

const ARGENT_MIN = 2
const ARGENT_MAX = 5

const COULEUR_HAUT_HP = 'success'
const COULEUR_MOYEN_HP = 'yellow'
const COULEUR_BAS_HP = 'red'

let debugFuncGagnerArgent = 0
let debugFuncAttaquer = 0
let debugNbreSacArgentTotal = 0

const props = defineProps({
  pokemonStore: Array,
  infoJoueur: Array
})

const emit = defineEmits(["changerPokemon"])

const viePokemonAff = ref(100)
const couleurPokemon = ref(COULEUR_HAUT_HP)
const isDying = ref(false);
const moneyBags = ref([]); // Stocke les sacs d'argent

// Utilisation du getter pour obtenir un Pokémon aléatoire
const randomPokemon = computed(() => {
  return props.infoJoueur[0].pokemonEnCours
});


function gagnerArgent() {
  console.log("Gagner argent a été appelé :" + ++debugFuncGagnerArgent)

  let argentTotal = (Math.floor(Math.random() * (ARGENT_MAX - ARGENT_MIN)) + 1) * props.infoJoueur[0].zoneEnCours
    + Math.ceil((randomPokemon.value.stats[0].base_stat * props.infoJoueur[0].zoneEnCours * 0.005));

  // Ajoute plusieurs sacs d'argent avec des positions aléatoires
  for (let i = 0; i < 3; i++) { // 3 sacs par Pokémon tué
    moneyBags.value.push({
      x: Math.random() * 300, // Position X aléatoire
      y: Math.random() * -250, // Position Y aléatoire
      amount: Math.ceil(argentTotal / 3) // Argent réparti sur 3 sacs
    });
    debugNbreSacArgentTotal++
  }
  console.log("Sac d'argent créé au total :" + debugNbreSacArgentTotal)
}

function collectMoney(index, amount) {
  props.infoJoueur[0].argent += amount; // Ajoute l'argent en touchant un sac
  moneyBags.value.splice(index, 1); // Supprime le sac
}


function attaquePokemon() {
  if (!isDying.value) {
    console.log("Attaquer a été appelé :" + ++debugFuncAttaquer)
    randomPokemon.value.hp -= props.infoJoueur[0].attaque
    let pourcentagePv = Math.ceil(randomPokemon.value.hp / randomPokemon.value.stats[0].base_stat * 100)

    viePokemonAff.value = pourcentagePv

    // Modifie la couleur de la bar de vie selon les PV manquant du pokemon
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

function changePokemon() {
  if (props.pokemonStore.pokemons.length > 0) {
    // Récupère un pokemon aléatoire du tableau de pokemon
    const randomPoke = JSON.parse(JSON.stringify(props.pokemonStore.pokemons[Math.floor(Math.random() * props.pokemonStore.pokemons.length)]));

    // Recalcule les hp du pokemon en tenant compte de la zone
    randomPoke.hp = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours
    randomPoke.stats[0].base_stat = randomPoke.stats[0].base_stat * props.infoJoueur[0].zoneEnCours

    // Affecte le nouveau pokemon au pokemon actuelle
    randomPokemon.value = randomPoke;

    // Remet l'affichage des PV par défaut
    viePokemonAff.value = 100
    couleurPokemon.value = COULEUR_HAUT_HP
  }
}

onMounted(async () => {
  await pokemonStore.fetchPokemon()
});

</script>


<style scoped lang="sass">
.money-bags-container
  position: relative
  width: 320px
  height: 300px
  pointer-events: none
// Empêche les sacs de bloquer les clics

.money-bag
  position: absolute
  width: 40px
  height: 40px
  cursor: pointer
  pointer-events: auto
  // Permet d'interagir avec les sacs
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

</style>
