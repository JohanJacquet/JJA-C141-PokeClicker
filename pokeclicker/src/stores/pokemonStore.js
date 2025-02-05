// Exemple avec Axios dans le store Pinia pour récupérer les stats
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
  }),
  actions: {
    async fetchPokemon() {
      const ids = [1, 4, 7]; // Exemple : Bulbizarre, Salamèche, Carapuce
      const promises = ids.map(id =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      );

      const responses = await Promise.all(promises);
      this.pokemons = responses.map(res => {
        const pokemon = {
          name: res.data.name,
          image: res.data.sprites.front_default,
          stats: res.data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }))
        };
        return pokemon;
      });
    },
  },
});
