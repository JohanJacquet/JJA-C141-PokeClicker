<template>
  <div class="container">
    <div class="btn">
      <btn-pokemon></btn-pokemon>
    </div>
    <div class="stat">
      <statistique :stats="statistique"></statistique>
    </div>
  </div>

</template>


<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";

const statistique = ref([
  { type: "Argent", valeur: 3420},
  { type: "Attaque", valeur: 120}
])


</script>



<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: auto
  height: 20vh // 100 = au centre, et si je met moi, ça va plus haut
  background-color: red
  .btn
    background-color: blue
  .stat
    background-color: blue
</style>

