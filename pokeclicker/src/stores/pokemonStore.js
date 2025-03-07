import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    pokemonByType: {}, // Stocke les Pokémon triés par type et par puissance
  }),
  actions: {
    async fetchPokemon() {
      try {
        // Récupérer la liste des 151 premiers Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;

        // Récupérer les détails de chaque Pokémon
        const promises = pokemonList.map(pokemon => axios.get(pokemon.url));
        const details = await Promise.all(promises);

        //  Formatter les données et trier par type & puissance
        const allPokemons = details.map(res => ({
          id: res.data.id,
          name: res.data.name,
          estBoss: false,
          estMort: false,
          image: res.data.sprites.front_default,
          types: res.data.types.map(type => type.type.name), // Liste des types
          hp: res.data.stats[0].base_stat,
          stats: res.data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }))
        }));

        // Trier les Pokémon  `{ type: { weak: [], medium: [], strong: [] } }`
        this.pokemonByType = {};

        allPokemons.forEach(pokemon => {
          pokemon.types.forEach(type => {
            if (!this.pokemonByType[type]) {
              this.pokemonByType[type] = { weak: [], medium: [], strong: [] };
            }

            // Trier selon la puissance des HP
            if (pokemon.hp < 40) {
              this.pokemonByType[type].weak.push(pokemon);
            } else if (pokemon.hp < 80) {
              this.pokemonByType[type].medium.push(pokemon);
            } else {
              this.pokemonByType[type].strong.push(pokemon);
            }
          });
        });

        // Initialiser la liste générale des Pokémon
        // Par défaut, on affiche les pokemon de type normal faible et moyen
        this.getPokemonsByTypesAndStrengths(["normal"], ["weak", "medium"]);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon:', error);
      }
    },

    // Récupérer plusieurs types et plusieurs niveaux de puissance
    // strengths : weak, medium, strong
    // types : fire, water, grass, ...
    getPokemonsByTypesAndStrengths(types = [], strengths = []) {
      let result = [];

      types.forEach(type => {
        if (this.pokemonByType[type]) {
          strengths.forEach(strength => {
            if (this.pokemonByType[type][strength]) {
              result = [...result, ...this.pokemonByType[type][strength]];
            }
          });
        }
      });

      this.pokemons = result;
    },

    setPokemonsAvailable(zone) {
      // 1 - 9 : type normal | faible medium
      // 10 : type roche | strong
      // 11 à 19 : type roche, sol, acier | faible
      // 20 : eau,
    }
  },
});
