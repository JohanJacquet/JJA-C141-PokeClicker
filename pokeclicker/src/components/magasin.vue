<template>
  <div class="statistique">
    <v-table class="custom-table" height="100%">
      <thead class="magasin-head">
      <tr>
        <td colspan="3">
          PokeStore
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="index in 10" >
        <td>
          <img src="../assets/shopIcon/proteine.png" alt="image de l'objet protéine, correspondant à l'amélioration N°1"/>
          <p>DPC : 999</p>
        </td>
        <td>
          <div v-for="index in 10" class="upgrade-container">
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
      </tbody>
    </v-table>
  </div>
</template>

<script setup>

</script>

<style scoped lang="sass">
.magasin-head
  position: sticky
  top: 0
  z-index: 1

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

.statistique
  margin: 20px

.custom-table
  border-collapse: separate !important
  border-spacing: 0 8px
  width: 100%

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
  margin: 10px
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
