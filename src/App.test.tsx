// App.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { PokemonList, PokemonDetail } from "./components";

// Mock the child components
jest.mock("./components", () => ({
  PokemonList: ({ selectPokemon }: { selectPokemon: (id: string) => void }) => (
    <div data-testid="pokemon-list">
      <button onClick={() => selectPokemon("1")}>Select Pokémon</button>
    </div>
  ),
  PokemonDetail: ({ pokemonId }: { pokemonId: string }) => (
    <div data-testid="pokemon-detail">
      {pokemonId ? `Pokémon ID: ${pokemonId}` : "No Pokémon selected"}
    </div>
  ),
}));

describe("App Component", () => {
  it("renders PokemonList and PokemonDetail components", () => {
    render(<App />);

    // Check if PokemonList and PokemonDetail components are rendered
    expect(screen.getByTestId("pokemon-list")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-detail")).toBeInTheDocument();
  });

  it("updates selectedPokemonId when a Pokémon is selected", () => {
    render(<App />);

    // Click the button in the mocked PokemonList to select a Pokémon
    fireEvent.click(screen.getByText("Select Pokémon"));

    // Check if the PokemonDetail component received the correct ID
    expect(screen.getByTestId("pokemon-detail")).toHaveTextContent(
      "Pokémon ID: 1"
    );
  });
});
