<template>
  <div class="zone-container">
    <v-carousel hide-delimiters class="carousel" height="auto">
      <v-carousel-item>
        <ul>
          <li>
            <img src="../assets/roadIcon/basic.png" alt="image correspondant à la route en cours" height="56" width="56"/>
          </li>
          <li>
            <p>1</p>
          </li>
        </ul>
      </v-carousel-item>
    </v-carousel>
    <p class="font-italic zone-txt-restant">0 / 10</p>
  </div>
</template>


<script setup>

</script>



<style scoped lang="sass">

.zone-txt-restant
  margin-top: 6px

.zone-container
  border: rgba(15,15,15,0.7) 3px solid
  margin: 5px
  background-color: rgba(255,255,255,0.4)
  text-align: center
  color: black

.carousel
  min-width: 300px
  font-size: 18px
  font-weight: bold


ul
  text-decoration: none
  list-style-type: none
  padding: 0
  margin: 0

</style>
