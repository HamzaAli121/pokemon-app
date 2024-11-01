import React from "react";
import { PokemonItem } from "./PokemonItem";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import "./PokemonList.css";
import { useFetchPokemonListQuery } from "../../api/pokemonApi";

interface PokemonListProps {
  selectPokemon: (id: string) => void;
}

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ selectPokemon }) => {
  const { data, error, isLoading } = useFetchPokemonListQuery("");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Error loading Pokémon list" />;
  }

  return (
    <main className="pokemon-list" role="main">
      <h2 className="heading">PokeReact</h2>
      <ul>
        {data?.results.map((item: Pokemon) => (
          <PokemonItem
            key={item.name}
            pokemon={item}
            onSelect={selectPokemon}
          />
        ))}
      </ul>
    </main>
  );
};

export default PokemonList;
