<template>
  <div class="magasin-container">
    <p class="ma-2">PokeDollar : {{ monArgent }}</p>
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
                 :alt="ligneMagasin.alt"
                 v-tooltip="ligneMagasin.tooltip"/>
            <p>{{ ligneMagasin.nbreAchat}} {{ ligneMagasin.nom }}</p>
            <p>{{ ligneMagasin.typeDegat }} : {{ getDegatObjet(ligneMagasin) }}</p>
          </div>
        </td>
        <td>
          <div v-for="(upgrade, y) in ligneMagasin.upgrades" :key="y" class="upgrade-container">
            <img :src="getImagePath(upgrade.imgUpgrade)"
                 :alt="upgrade.altUpgrade"
                 v-tooltip="upgrade.tooltipUpgrade"
                 class="upgrade-img"/>
          </div>
        </td>
        <td>
          <v-btn class="btn-acheter">
            <p>
              <div>
                Achetez
              </div>
              <div class="upgrade-prix">
                {{ getPrixObjet(ligneMagasin) }}
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
})

const monArgent = computed(() => {
  return props.infoJoueur[0].argent
})

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
  return Math.ceil(ligneMagasin.prixDefaut * Math.pow(ligneMagasin.multPrix, ligneMagasin.nbreAchat))
}

 function getDegatObjet(ligneMagasin) {
  let mult = 1
  let degatDefaut = ligneMagasin.typeDegat === "DPC" ? ligneMagasin.dpc : ligneMagasin.dps

  for (const upgrade in ligneMagasin.upgrades) {
    if (upgrade.acheterUpgrade) {
      mult += upgrade.multUpgrade
    }
  }


  return Math.round((degatDefaut * ligneMagasin.nbreAchat) * mult)
}


</script>

<style scoped lang="sass">
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
</style>
