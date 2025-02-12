// Exemple avec Axios dans le store Pinia pour récupérer les stats
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
  }),
  actions: {
    async fetchPokemon() {
      const ids = Array.from({length: 1}, (_, i) => i + 1); // Exemple : Bulbizarre, Salamèche, Carapuce
      const promises = ids.map(id =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      );

      const responses = await Promise.all(promises);
      this.pokemons = responses.map(res => {
        const pokemon = {
          name: res.data.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
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
