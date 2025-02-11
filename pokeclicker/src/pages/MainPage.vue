<template>
  <div class="container">
    <div>
      <carousel-zone></carousel-zone>
    </div>
    <div class="btn">
      <btn-pokemon></btn-pokemon>
    </div>
    <v-card class="onglet">
      <v-tabs
        v-model="tab"
        bg-color="primary"
      >
        <v-tab value="one">PokeShop</v-tab>
        <v-tab value="two">Statistique</v-tab>
        <v-tab value="three">Rebirth ?</v-tab>
      </v-tabs>

      <v-card-text class="pa-0">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one" class="magasin">
            <magasin></magasin>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <div class="stat">
              <statistique :stats="statistique"></statistique>
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item value="three">
            A venir... !!!!
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>

</template>


<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
import CarouselZone from "@/components/carouselZone.vue";
import Magasin from "@/components/magasin.vue";

const tab = ref(null)

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

.onglet
  background-color: rgba(255,255,255,0.4)
</style>

