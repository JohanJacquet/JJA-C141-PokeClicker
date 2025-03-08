<template>
  <div class="container">
    <!-- Onglet Tabs à gauche -->
    <v-card class="onglet">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one" @click="incrementClickCount">PokeShop</v-tab>
        <v-tab value="two" @click="clickCount = 0">Statistique</v-tab>
        <v-tab value="three" @click="clickCount = 0">Rebirth ?</v-tab>
      </v-tabs>



      <v-card-text class="pa-0">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one" class="magasin">
            <magasin :infoMagasin="magasin"
                     :infoJoueur="joueur"
                     :getDegatTotalObjet="getDegatTotalObjet"
                     :dpcJoueur="joueurDPC"
                     :dpsJoueur="joueurDPS"></magasin>
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
      <carousel-zone class="carousel"
                   :infoJoueur="joueur"
                   :pokemonStore="pokemonStore"
                   :changePokemon="changePokemon"
                   :compteurZone="compteurZoneSuivante"
                   :resetCompteurZone="resetCompteurZone"></carousel-zone>
      <btn-pokemon class="btn" @changerPokemon="changePokemon"
                   :infoJoueur="joueur"
                   :pokemonStore="pokemonStore"
                   :dpcJoueur="joueurDPC"
                   :dpsJoueur="joueurDPS"></btn-pokemon>
    </div>
  </div>
</template>

<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
import CarouselZone from "@/components/carouselZone.vue";
import Magasin from "@/components/magasin.vue";
import {usePokemonStore} from "@/stores/pokemonStore.js";
import {onMounted, ref, computed, reactive} from "vue";

const props = defineProps({
  videoBg: Boolean,
})

const joueur = reactive([{
  argent: 99999999999,
  attaque: 1,
  critChance: 1,
  critMult: 2,
  zoneEnCours: 9,
  zoneMax: 100,
  multDps: 1,
  multDpc: 1,
  pourcDpsEnDpc: 0,
  pourcDpcEnDps: 0,
  pokemonEnCours: null
}])

const magasin = reactive([
  {
    nom: "Protéine",
    img: "../assets/shopIcon/proteine.png",
    alt: "image de l'objet de protéine, correspondant à l'objet N°1",
    tooltip: "Acheter des protéines ajoute ",
    nbreAchat: 15000000,
    nbreAchatUpgrade: 0,
    upgrades: [
      {
        nbreAchatRequis: 10,
        prixUpgrade: 100,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°1",
        tooltipUpgrade: "Augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 25,
        prixUpgrade: 250,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 50,
        prixUpgrade: 1000,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°3",
        tooltipUpgrade: "Augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 75,
        prixUpgrade: 8000,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°4",
        tooltipUpgrade: "Augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 100,
        prixUpgrade: 80000,
        multUpgrade: 1.5,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°5",
        tooltipUpgrade: "Augmente l'efficacité de base par 150%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 125,
        prixUpgrade: 400000,
        multUpgrade: 2,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°6",
        tooltipUpgrade: "Augmente l'efficacité de base par 200%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 150,
        prixUpgrade: 4000000,
        multUpgrade: 2.5,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/proteine-upgrade.png",
        altUpgrade: "image de l'amélioration de l'objet de protéine, correspondant à l'amélioration N°7",
        tooltipUpgrade: "Augmente l'efficacité de base par 250%.",
        erreur: false,
      }
    ],
    typeDegat: "DPC",
    dpc: 1,
    dps: 0,
    prixDefaut: 5,
    multPrix: 1.07,
    prixEnCours: 0,
    erreur: false,
    valide: false,
  },
  {
    nom: "Pichu",
    img: "../assets/shopIcon/pichu.png",
    imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
    alt: "image du pokemon pichu, correspondant à l'amélioration N°2",
    tooltip: "Acheter des Pichu ajoute ",
    nbreAchat: 150,
    nbreAchatUpgrade: 0,
    upgrades: [
      {
        nbreAchatRequis: 10,
        prixUpgrade: 500,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
        altUpgrade: "image de l'amélioration du pokemon Pichu, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Acheter l'amélioration de Pichu augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 25,
        prixUpgrade: 1250,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
        altUpgrade: "image de l'amélioration du pokemon Pichu, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Acheter l'amélioration de Pichu augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 50,
        prixUpgrade: 5000,
        multUpgrade: 1,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
        altUpgrade: "image de l'amélioration du pokemon Pichu, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Acheter l'amélioration de Pichu augmente l'efficacité de base par 100%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 75,
        prixUpgrade: 40000,
        multUpgrade: 1.5,
        pourcDpsEnDpc: 0,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
        altUpgrade: "image de l'amélioration du pokemon Pichu, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Acheter l'amélioration de Pichu augmente l'efficacité de base par 150%.",
        erreur: false,
      },
      {
        nbreAchatRequis: 100,
        prixUpgrade: 400000,
        multUpgrade: 0,
        pourcDpsEnDpc: 0.5,
        pourcDpcEnDps: 0,
        acheterUpgrade: false,
        imgUpgrade: "../assets/shopIcon/pichu-upgrade.png",
        altUpgrade: "image de l'amélioration du pokemon Pichu, correspondant à l'amélioration N°2",
        tooltipUpgrade: "Augmente le DPC par 0.5% de votre DPS.",
        erreur: false,
      }
    ],
    typeDegat: "DPS",
    dpc: 0,
    dps: 5,
    prixDefaut: 50,
    multPrix: 1.07,
    prixEnCours: 0,
    erreur: false,
    valide: false,
  },
]);

const pokemonStore = usePokemonStore();


const tab = ref(null);

const emit = defineEmits(["update:videoBg"]); // Permet de mettre à jour la prop dans App.vue
const clickCount = ref(0);
const compteurZoneSuivante = ref(0)

const joueurDPC = computed(() => {
  let totalDPC = 0
  let multDpsEnDpc = 0
  for (let ligneMagasin of magasin) {
    // Récupère le total de DPC donnée par les améliorations de type DPC
    if (ligneMagasin.typeDegat === "DPC") {
      totalDPC += getDegatTotalObjet(ligneMagasin)
    }

    // Récupère les multiplicateur de DPC par rapport au DPS
    for (let upgrade of ligneMagasin.upgrades) {
      if (upgrade.acheterUpgrade) {
        if (upgrade.pourcDpsEnDpc !== 0) {
          multDpsEnDpc += upgrade.pourcDpsEnDpc
        }
      }
    }
  }

  return totalDPC + joueur[0].attaque + ((joueurDPS.value/100) * multDpsEnDpc)
})

const joueurDPS = computed(() => {
  let totalDPS = 0
  for (let ligneMagasin of magasin) {
    if (ligneMagasin.typeDegat === "DPS") {
      totalDPS += getDegatTotalObjet(ligneMagasin)
    }
  }

  return totalDPS
})

function resetCompteurZone() {
  compteurZoneSuivante.value = 0
}

// Permet de compter le nombre de clic sur l'onglet pour faire un truc à la con qui sert à rien
function incrementClickCount() {
  clickCount.value++;

  if (clickCount.value >= 10) {
    emit("update:videoBg", true); // Envoie la mise à jour à App.vue
    clickCount.value = 0; // Reset après activation
  }
}

// Calcule les dégats qu'un objet passé en paramètre fait et retourne ce nombre
function getDegatTotalObjet(ligneMagasin) {
  let mult = 1
  let degatDefaut = ligneMagasin.typeDegat === "DPC" ? ligneMagasin.dpc : ligneMagasin.dps

  let degatTotaux = Math.round(degatDefaut * ligneMagasin.nbreAchat)
    for (let upgrade of ligneMagasin.upgrades) {
      if (upgrade.acheterUpgrade === true) {
        degatTotaux *= (upgrade.multUpgrade + mult)
      }
    }

  return degatTotaux
}

// Change le pokemon par un autre en prenant en compte la zone dans laquelle on est.
// Si le paramètre isDead est vrai, cela veut dire qu'on a tué le pokemon (pas juste changé de zone)
function changePokemon(isDead = false) {
  if (pokemonStore.pokemons.length > 0) {
    // Récupère un pokemon aléatoire du tableau de pokemon
    // On fait une copie de ce pokemon (on ne veut pas changer directement notre jeu de données
    const randomPoke = JSON.parse(JSON.stringify(pokemonStore.pokemons[Math.floor(Math.random() * pokemonStore.pokemons.length)]));
    randomPoke.estBoss = (joueur[0].zoneEnCours+1) % 10 === 0
    if (randomPoke.estBoss) {
      // Recalcule les hp du pokemon en tenant compte de la zone
      randomPoke.hp = 10 * (joueur[0].zoneEnCours + Math.pow(1.55,joueur[0].zoneEnCours)) * (randomPoke.estBoss * 10)
      randomPoke.stats[0].base_stat = 10 * (joueur[0].zoneEnCours + Math.pow(1.55,joueur[0].zoneEnCours)) * (randomPoke.estBoss * 10)
    } else {
      // Recalcule les hp du pokemon en tenant compte de la zone
      randomPoke.hp = 10 * (joueur[0].zoneEnCours + Math.pow(1.55,joueur[0].zoneEnCours))
      randomPoke.stats[0].base_stat = 10 * (joueur[0].zoneEnCours + Math.pow(1.55,joueur[0].zoneEnCours))
    }

    // Affecte le nouveau pokemon au pokemon actuelle
    joueur[0].pokemonEnCours = randomPoke;

    if (isDead) {
      compteurZoneSuivante.value += 1
    } else {
      compteurZoneSuivante.value = 0
    }
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
