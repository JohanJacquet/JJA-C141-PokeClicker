<template>
  <div class="app-container" :class="{'video-active': videoBackground}">
    <video v-if="videoBackground" autoplay loop muted class="bg-video">
      <source src="@/assets/video/furret walk around the world.mp4" type="video/mp4">
    </video>
    <audio ref="bgMusic" loop>
      <source src="@/assets/music/furret walk around the world.mp3" type="audio/mp3">
    </audio>
    <main-page :videoBg="videoBackground" @update:videoBg="videoBackground = $event"></main-page>
  </div>
</template>

<script setup>
import MainPage from "@/pages/MainPage.vue";

const videoBackground = ref(false);
const bgMusic = ref(null);

onMounted(() => {
  if (bgMusic.value) {
    bgMusic.value.volume = 0.5; // Volume à 50% (modifiable)

    // Force la lecture, même si l’utilisateur n’a pas interagi
    const playMusic = () => {
      bgMusic.value.play().catch(() => {
        console.warn("L'utilisateur doit interagir avec la page pour démarrer l'audio.");
      });
      document.removeEventListener("click", playMusic);
    };

    bgMusic.value.play().catch(() => {
      // Si autoplay est bloqué, on attend un premier clic de l'utilisateur
      document.addEventListener("click", playMusic);
    });
  }
});
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
  position: relative

.video-active
  background-image: none // Supprime l'image de fond

.bg-video
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  object-fit: cover
  z-index: -1
</style>
