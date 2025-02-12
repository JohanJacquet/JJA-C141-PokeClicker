<template>
  <div class="container">
    <!-- Onglet Tabs à gauche -->
    <v-card class="onglet">
      <v-tabs v-model="tab" bg-color="primary">
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
              <statistique :joueur="joueur"></statistique>
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
      <carousel-zone class="carousel"></carousel-zone>
      <btn-pokemon class="btn" :joueur="joueur"></btn-pokemon>
    </div>
  </div>
</template>

<script setup>
import BtnPokemon from "@/components/btnPokemon.vue";
import Statistique from "@/components/statistique.vue";
import CarouselZone from "@/components/carouselZone.vue";
import Magasin from "@/components/magasin.vue";


const joueur = reactive([

  { type: "Argent", valeur: 0 },
  { type: "Attaque", valeur: 10 },
])

const tab = ref(null);

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
  height: 100vh

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
