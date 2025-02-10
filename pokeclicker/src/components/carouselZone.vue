<template>
  <div class="zone-container">
    <v-carousel hide-delimiters class="carousel" height="auto">
      <v-carousel-item>
        <ul>
          <li>
            <img src="../assets/roadIcon/basic.png" height="56" width="56"/>
          </li>
          <li>
            <p>1</p>
          </li>
        </ul>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>


<script setup>

</script>



<style scoped lang="sass">


.carousel
  min-width: 300px
  border: black 2px solid
  margin: 5px
  background-color: rgba(255,255,255,0.4)


ul
  text-decoration: none
  list-style-type: none
  padding: 0
  margin: 0

li
  text-align: center
  font-size: 18px
  font-weight: bold
  color: black




</style>
