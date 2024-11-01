import React from "react";
import "./PokemonList.css";

interface PokemonData {
  name: string;
  url: string;
}

interface PokemonProps {
  pokemon: PokemonData;
  onSelect: (id: string) => void;
}

export const PokemonItem: React.FC<PokemonProps> = ({
  pokemon,
  onSelect,
}) => {
  const id = pokemon.url.split("/")[6];

  const capitalizeFirstLetter = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <li onClick={() => onSelect(id)} className="text-center cursor-pointer">
      <img
        className="pokemon-list-image"
        src={`${process.env.REACT_APP_POKEMON_SPRITE_BASE_URL}/${id}.gif`}
        alt={pokemon.name}
      />
      <div className="title-container">
        <p className="text-lg font-medium text-gray-600 truncate">
          {capitalizeFirstLetter(pokemon.name)}
        </p>
      </div>
    </li>
  );
};
