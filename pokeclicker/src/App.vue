<template>
  <div class="app-container">
    <main-page></main-page>
  </div>
</template>

<script setup>
  //
import MainPage from "@/pages/MainPage.vue";
</script>

<style lang="sass" scoped>
.app-container
  background-image: url('@/assets/bg-city.jpg')
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  background-attachment: fixed
  height: 100vh
  margin: 0

</style>
