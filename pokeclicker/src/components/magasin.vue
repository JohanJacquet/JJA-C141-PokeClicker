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
      <tr>
        <td>
          <div class="magasin-ligne">
            <img src="../assets/shopIcon/proteine.png" alt="image de l'objet protéine, correspondant à l'amélioration N°1"/>
            <p>0</p>
            <p>DPC : 0</p>
          </div>
        </td>
        <td>
          <div v-for="index in 10" :key="index" class="upgrade-container">
            <img src="../assets/shopIcon/proteine-upgrade.png" alt="image de l'objet l'amélioration de protéine, correspondant à l'amélioration N°1" class="upgrade-img"/>
          </div>
        </td>
        <td>
          <v-btn class="btn-acheter">
            <p>
              <div>
                Achetez
              </div>
              <div class="upgrade-prix">
                999
              </div>
            </p>
          </v-btn>
        </td>
      </tr>
      <tr>
        <td>
          <div class="magasin-ligne">
            <img src="../assets/shopIcon/pichu.png" alt="image de l'objet protéine, correspondant à l'amélioration N°1"/>
            <p>0</p>
            <p>DPS : 0</p>
          </div>
        </td>
        <td>
          <div v-for="index in 10" :key="index" class="upgrade-container">
            <img src="../assets/shopIcon/pichu-upgrade.png" alt="image de l'objet l'amélioration de protéine, correspondant à l'amélioration N°1" class="upgrade-img"/>
          </div>
        </td>
        <td>
          <v-btn class="btn-acheter">
            <p>
              <div>
                Achetez
              </div>cd
              <div class="upgrade-prix">
                999
              </div>
            </p>
          </v-btn>
        </td>
      </tr>
      <tr>
        <td>
          <div class="magasin-ligne">
            <img src="../assets/shopIcon/zigzaton.png" alt="image de l'objet protéine, correspondant à l'amélioration N°1"/>
            <p>0</p>
            <p>DPS : 0</p>
          </div>
        </td>
        <td>
          <div v-for="index in 10" :key="index" class="upgrade-container">
            <img src="../assets/shopIcon/zigzaton-upgrade.png" alt="image de l'objet l'amélioration de protéine, correspondant à l'amélioration N°1" class="upgrade-img"/>
          </div>
        </td>
        <td>
          <v-btn class="btn-acheter">
            <p>
              <div>
                Achetez
              </div>
              <div class="upgrade-prix">
                999
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
  infoJoueur: Array,
})



const monArgent = computed(() => {
  return props.infoJoueur[0].argent
})
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
