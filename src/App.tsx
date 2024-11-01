import React, { useState, useCallback } from "react";
import "./App.css";
import { PokemonDetail, PokemonList } from "./components";

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <div id="app" className="pokedex">
      <PokemonList selectPokemon={handleSelect} />
      <PokemonDetail pokemonId={selectedId} />
    </div>
  );
}

export default App;
