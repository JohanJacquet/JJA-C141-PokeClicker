import { defineStore } from 'pinia';
import axios from 'axios';

const zoneMapping = [
  { range: [1, 9], types: ["normal"], strengths: ["weak", "medium"] },
  { range: [10, 10], types: ["rock"], strengths: ["strong"] },
  { range: [11, 19], types: ["rock", "ground", "steel"], strengths: ["weak"] },
  { range: [20, 20], types: ["water"], strengths: ["strong"] },
  { range: [21, 29], types: ["water"], strengths: ["weak", "medium"] },
  { range: [30, 30], types: ["electric"], strengths: ["medium"] },
  { range: [31, 39], types: ["ghost", "poison"], strengths: ["weak", "medium"] },
  { range: [40, 40], types: ["grass"], strengths: ["strong"] },
  { range: [41, 49], types: ["grass", "bug"], strengths: ["weak", "medium"] },
  { range: [50, 50], types: ["poison"], strengths: ["strong"] },
  { range: [51, 59], types: ["fighting"], strengths: ["weak", "medium", "strong"] },
  { range: [60, 60], types: ["psychic"], strengths: ["strong"] },
  { range: [61, 69], types: ["psychic", "fairy"], strengths: ["weak", "medium", "strong"] },
  { range: [70, 70], types: ["fire"], strengths: ["strong"] },
  { range: [71, 79], types: ["fire"], strengths: ["weak", "medium"] },
  { range: [80, 80], types: ["ground"], strengths: ["strong"] },
  { range: [81, 89], types: ["dragon"], strengths: ["weak", "medium", "strong"] },
  { range: [90, 90], types: ["ice"], strengths: ["strong"] },
  { range: [91, 99], types: ["ice"], strengths: ["weak", "medium", "strong"] },
  { range: [100, 100], types: ["fighting"], strengths: ["strong"] },
  { range: [101, 109], types: ["flying"], strengths: ["weak", "medium", "strong"] },
  { range: [110, 110], types: ["poison", "ghost"], strengths: ["strong"] },
  { range: [111, 119], types: ["electric"], strengths: ["weak", "medium", "strong"] },
  { range: [120, 120], types: ["dragon"], strengths: ["strong"] },
  { range: [121, 129], types: ["grass", "poison", "fire", "flying", "water", "bug", "normal", "electric",
      "ground", "fairy", "fighting", "psychic", "rock", "steel", "ice", "ghost", "dragon"], strengths: ["weak", "medium", "strong"] },
  { range: [130, 130], types: ["fire", "water", "grass", "normal"], strengths: ["strong"] },
]

export const usePokemonStore = defineStore('pokemon', {

  state: () => ({
    pokemons: [],
    pokemonByType: {}, // Stocke les Pokémon triés par type et par puissance
    zoneMapping: zoneMapping || []
  }),
  actions: {
    async fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;

        const promises = pokemonList.map(pokemon => axios.get(pokemon.url));
        const details = await Promise.all(promises);

        // Récupère tous les infos utiles des pokemon pour ensuite les trier
        const allPokemons = details.map(res => ({
          id: res.data.id,
          name: res.data.name,
          estBoss: false,
          estMort: false,
          image: res.data.sprites.front_default,
          types: res.data.types.map(type => type.type.name),
          hp: res.data.stats[0].base_stat,
          stats: res.data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }))
        }));

        // Trier les Pokémon  `{ type (feu, glace,... et leur force) : { weak: [], medium: [], strong: [] } }`
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
      const match = this.zoneMapping.find(entry => zone >= entry.range[0] && zone <= entry.range[1]);

      if (match) {
        this.getPokemonsByTypesAndStrengths(match.types, match.strengths);
      } else {
        console.warn(`Zone ${zone} non définie dans le mapping.`);
        this.getPokemonsByTypesAndStrengths([], []);
      }
    }

  },
});
