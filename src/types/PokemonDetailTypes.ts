export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    other?: {
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface IPokemonDetailProps {
  pokemonId: string;
}
