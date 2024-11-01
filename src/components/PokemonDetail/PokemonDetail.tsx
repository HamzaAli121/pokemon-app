import React from "react";
import { useFetchPokemonByIdQuery } from "../../api/pokemonApi";
import "./PokemonDetail.css";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { IPokemonDetailProps, Pokemon } from "../../types/PokemonDetailTypes";

const PokemonImage: React.FC<{ src?: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="pokemon-image-wrapper">
    <img className="pokemon-image" src={src} alt={alt} />
  </div>
);

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <p> <strong>{label}</strong> {value} </p>
);

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonDetail: React.FC<IPokemonDetailProps> = ({ pokemonId }) => {
  const { data, error, isLoading } = useFetchPokemonByIdQuery(pokemonId);

  if (isLoading) return <Loading />;
  if (error) return <Error message="Error loading Pokémon details" />;

  const { name, height, weight, sprites, types } = (data as Pokemon) || {};

  const renderTypes = () => (
    <div className="type-container">
      {types?.map(({ type }, index) => (
        <div key={`type-${type.name}-${index}`}>{type.name}</div>
      ))}
    </div>
  );

  return (
    <div className="pokemon-details">
      {name ? (
        <>
          <h2>{capitalizeFirstLetter(name)}</h2>
          <PokemonImage
            src={sprites?.other?.dream_world?.front_default}
            alt={name}
          />
          <div className="details">
            <DetailRow label="Name" value={capitalizeFirstLetter(name)} />
            <DetailRow label="Height" value={`${height} cm`} />
            <DetailRow label="Weight" value={`${weight} kg`} />
            <DetailRow label="Types" value={renderTypes()} />
          </div>
        </>
      ) : (
          <h2>Select a Pokemon</h2>
      )}
    </div>
  );
};

export default PokemonDetail;
