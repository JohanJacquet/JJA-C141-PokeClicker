<template>
  <div class="statistique">
    <v-table class="custom-table">
      <tbody>
      <tr>
        <td>
          <ul>
            <li>
              <img src="../../public/img/stat/argent.png" alt="image de l'objet pièce rune, correspondant à l'argent 🤑"/>
            </li>
            <li>
              <p>Argent : 20000</p>
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li>
              <img src="../../public/img/stat/attaque+.png" alt="image de l'objet attaque+, correspondant à l'attaque 💪"/>
            </li>
            <li>
              <p>Attaque : 20</p>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>

</script>

<style scoped lang="sass">
.statistique
  margin: 20px

.custom-table
  border-collapse: separate !important
  border-spacing: 0 8px

.custom-table td
  border: 6px double black
  padding: 15px
  text-align: center
  background-color: #f8f9fa

tbody
  background-color: white
  color: black

ul
  text-decoration: none
  list-style-type: none
  padding: 0
  margin: 0

li
  text-align: center
  font-size: 18px
  font-weight: bold

img
  margin-top: 10px
  width: 80px
  height: 80px
</style>
