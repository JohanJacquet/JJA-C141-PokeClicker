<template>
  <div class="magasin-container">
    <p class="ma-2">PokeDollar : {{ props.infoJoueur[0].argent}} et un DPC de {{ dpcJoueur }} et un DPS de {{ dpsJoueur }}</p>
    <v-table class="custom-table">
      <thead class="magasin-head">
      <tr>
        <td colspan="3">
          PokeStore
        </td>
      </tr>
      </thead>
      <tbody class="magasin-body">
      <tr v-for="(ligneMagasin, index) in props.infoMagasin" :key="index">
        <td>
          <div class="magasin-ligne">
            <img :src="getImagePath(ligneMagasin.img)"
                 :alt="ligneMagasin.alt"/>
            <v-tooltip class="tooltipMax" activator="parent" location="start">
              {{ ligneMagasin.tooltip }}{{ getDegatObjet(ligneMagasin) }}
            </v-tooltip>
            <p>{{ ligneMagasin.nbreAchat}} {{ ligneMagasin.nom }}</p>
            <p>{{ ligneMagasin.typeDegat }} : {{ props.getDegatTotalObjet(ligneMagasin) }}</p>
          </div>
        </td>
        <td>
          <div v-for="(upgrade, y) in ligneMagasin.upgrades" :key="y" class="upgrade-container"
               :class="{ 'erreur': upgrade.erreur, 'pas-Acheter': !upgrade.acheterUpgrade }"
                v-show="!cacherAmelioration(y,ligneMagasin)">
            <img :src="getImagePath(upgrade.imgUpgrade)"
                 :alt="upgrade.altUpgrade"
                 @click="acheterUpgrade(upgrade, ligneMagasin, y)"
                 class="upgrade-img"/>
            <v-tooltip class="tooltipMax" activator="parent" location="start">
              {{ upgrade.tooltipUpgrade }} <br><span class="float-left"></span><br>{{ligneMagasin.nbreAchat}}/{{ upgrade.nbreAchatRequis }} achat <span class="float-right">{{ upgrade.prixUpgrade }}₽</span>
            </v-tooltip>
          </div>
        </td>
        <td>
          <v-btn class="btn-acheter" :class="{ 'erreur': ligneMagasin.erreur, 'achat-Valide': ligneMagasin.valide }" @click="acheterObjet(ligneMagasin)">
            <p>
              <div>
                Achetez
              </div>
              <div class="upgrade-prix">
                {{ getPrixObjet(ligneMagasin) }}₽
              </div>
            </p>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
const props = defineProps({
  infoJoueur: {
    type: Array,
    required: true,
  },
  infoMagasin: {
    type: Array,
    required: true,
  },
  getDegatTotalObjet: {
    type: Function,
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


const NBRE_CLIGNOTEMENT = 4

const erreurAchat = ref(false)

// Comme mon tableau utilise un chemin relatif, il me faut créer
// un objet URL pour créer un chemin complet car :src à besoin
// d'un chemin absolute pour fonctionner
function getImagePath(path) {
  return new URL(path, import.meta.url).href;
}

// Calcule le prix d'un objet au magasin en prenant en compte, son prix, le nombre de fois acheté et un mutliplicateur
// qui permet d'augmenter son prix
// prend en paramètre la ligne en cours dont on veut le prix
function getPrixObjet(ligneMagasin) {
  ligneMagasin.prixEnCours = Math.ceil(ligneMagasin.prixDefaut * Math.pow(ligneMagasin.multPrix, ligneMagasin.nbreAchat))
  return ligneMagasin.prixEnCours
}


// Récupère les dégats que donne un seul objet
function getDegatObjet(ligneMagasin) {

  let degat = 0
  let mult = 1
  let typeDegat = "aucun"

  // Vérifie si l'objet en cours et un objet DPS ou DPC
  if (ligneMagasin.typeDegat === "DPC") {
    degat = ligneMagasin.dpc
    typeDegat = "DPC"
  } else {
    degat = ligneMagasin.dps
    typeDegat = "DPS"
  }

  // Va vérifier tous les multiplicateur pour ensuite calculer les dégat totaux
  for (let upgrade of ligneMagasin.upgrades) {
    if (upgrade.acheterUpgrade === true && upgrade.multUpgrade !== 0) {
      degat *= (upgrade.multUpgrade+mult)
    }
  }

  // Retourne les dégat totaux
  return degat + " " + ligneMagasin.typeDegat
}

// Permet d'acheter un objet dans le magasin en retirant l'argent du joueur
function acheterObjet(ligneMagasin) {
  if (props.infoJoueur[0].argent >= ligneMagasin.prixEnCours) {
    ligneMagasin.nbreAchat += 1
    props.infoJoueur[0].argent -= ligneMagasin.prixEnCours
    clignoterObjetValide(ligneMagasin)
  } else {
    clignoterObjetErreur(ligneMagasin)
  }
}

function acheterUpgrade(upgrade, ligneMagasin, index) {
  // Si l'amélioration es déjà acheté, ne fait rien
  if (upgrade.acheterUpgrade) {
    return
  }

  // Si ce n'est pas la 1ère amélioration, vérifie si la précédent à été acheté sinon empêche
  if (index > 0) {
    if (!ligneMagasin.upgrades[index-1].acheterUpgrade) {
      clignoterObjetErreur(upgrade)
      return
    }
  }


  // Vérifie que :
  // Le joueur a assez d'argent
  // Que l'amélioration n'est pas déjà acheté
  // Que le nombre d'achat requis est suffisant
  if (props.infoJoueur[0].argent >= upgrade.prixUpgrade
    && upgrade.acheterUpgrade !== true
    && upgrade.nbreAchatRequis <= ligneMagasin.nbreAchat) {
    upgrade.acheterUpgrade = true
    props.infoJoueur[0].argent -= upgrade.prixUpgrade
  } else {
    clignoterObjetErreur(upgrade)
  }
}

function clignoterObjetErreur(objet) {
  let count = 0;
  const interval = setInterval(() => {
    objet.erreur = !objet.erreur; // Alterne true/false
    count++;

    if (count >= NBRE_CLIGNOTEMENT * 2) {
      clearInterval(interval);
      objet.erreur = false; // Remet à normal
    }
  }, 150);
}

function clignoterObjetValide(objet) {
  objet.valide = true; // Active la classe
  setTimeout(() => {
    objet.valide = false; // Désactive après 150ms
  }, 150);
}

// Permet de cachet les amélioration si les précédente ne sont pas acheté
function cacherAmelioration(index, ligneMagasin) {
  let pasAfficher = false

  // Vérifie si l'amélioration précédente est acheté pour savoir si on doit afficher l'amélioration courante
  if (index <= 0) {
    pasAfficher = false
  } else if (ligneMagasin.upgrades[index-1].acheterUpgrade) {
    pasAfficher = false
  } else {
    pasAfficher = true
  }

  return pasAfficher
}

</script>

<style scoped lang="sass">

.tooltipMax
  width: auto !important
  max-width: 1000px !important


.magasin-ligne
  min-height: 130px
  align-content: center

.magasin-container
  display: flex
  flex-direction: column
  height: 100vh // Utilisez 100vh pour prendre toute la hauteur de la vue
  overflow: hidden
  color: black

.custom-table
  border-collapse: separate !important
  border-spacing: 0 8px
  width: 100%
  display: flex
  flex-direction: column
  height: 100%

.magasin-head
  position: sticky
  top: 0
  z-index: 2
  background-color: white

.magasin-body
  flex-grow: 1
  overflow-y: auto
  height: 100%

tbody
  display: block
  overflow: auto
  width: 100%

.upgrade-prix
  margin-top: 20px

.btn-acheter
  min-height: 80px

.upgrade-container
  border: gold 4px solid
  background-color: rgba(180,180,180,0.2)
  float: left
  width: 9%
  margin: 10px 2px
  display: inline-block

.upgrade-img
  width: 35px

.custom-table td
  border: 6px double black
  padding: 15px
  text-align: center
  background-color: #f8f9fa

thead
  color: black
  text-align: center
  font-size: 18px
  font-weight: bold
  text-decoration: underline 2px

tbody
  background-color: white
  color: black

img
  margin-top: 10px

table tr td:nth-child(1)
  width: 20%

table tr td:nth-child(2)
  width: 70%


.pas-Acheter
  filter: brightness(50%)

.achat-Valide
  background: green

.erreur
  background: red !important

</style>
