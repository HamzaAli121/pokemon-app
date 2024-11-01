import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PokemonList from "./PokemonList";
import { useFetchPokemonListQuery } from "../../api/pokemonApi";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";

// Mock the useFetchPokemonListQuery hook
jest.mock("../../api/pokemonApi", () => ({
  useFetchPokemonListQuery: jest.fn(),
}));

jest.mock("../Loading/Loading", () => ({
  Loading: () => <div>Loading...</div>,
}));

jest.mock("../Error/Error", () => ({
  Error: ({ message }: { message: string }) => <div>{message}</div>,
}));

const mockSelectPokemon = jest.fn();

describe("PokemonList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<PokemonList selectPokemon={mockSelectPokemon} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: true,
      data: null,
    });

    render(<PokemonList selectPokemon={mockSelectPokemon} />);

    expect(screen.getByText(/Error loading Pokémon list/i)).toBeInTheDocument();
  });

  it("renders Pokémon list", async () => {
    const mockData = {
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    };

    (useFetchPokemonListQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    render(<PokemonList selectPokemon={mockSelectPokemon} />);

    // Wait for the header to appear
    expect(await screen.findByText(/PokeReact/i)).toBeInTheDocument();

    // Wait for the Pokémon names to appear
    expect(await screen.findByText(/Pikachu/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();

    // Click on a Pokémon to select it
    const pikachuItem = screen.getByText(/Pikachu/i).closest("li");
    if (pikachuItem) {
      pikachuItem.click();
    }

    expect(mockSelectPokemon).toHaveBeenCalledWith("25");
  });
});
