<template>
  <div class="container">
    <div>
      <btn-pokemon></btn-pokemon>
    </div>
    <div>
      <statistique></statistique>
    </div>
  </div>

</template>


<script setup>




import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
</script>



<style scoped lang="sass">
.container
  display: flex
  justify-content: center
  align-items: center
  margin: auto
  height: 20vh
  background-color: red
</style>
