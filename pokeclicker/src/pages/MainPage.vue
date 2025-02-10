<template>
  <div class="container">
    <div>
      <carousel-zone></carousel-zone>
    </div>
    <div class="btn">
      <btn-pokemon></btn-pokemon>
    </div>
    <div class="stat">
      <statistique :stats="statistique"></statistique>
    </div>
    <div class="magasin">
      <magasin></magasin>
    </div>
  </div>

</template>


<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
import CarouselZone from "@/components/carouselZone.vue";
import Magasin from "@/components/magasin.vue";

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
  height: 100vh // 100 = au centre,cd poke et si je met moi, ça va plus haut

</style>

