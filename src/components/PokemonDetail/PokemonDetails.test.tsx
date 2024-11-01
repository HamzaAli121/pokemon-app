import React from "react";
import { render, screen } from "@testing-library/react";
import { useFetchPokemonByIdQuery } from "../../api/pokemonApi";
import PokemonDetail from "./PokemonDetail";

// Mock the useFetchPokemonByIdQuery hook
jest.mock("../../api/pokemonApi", () => ({
  useFetchPokemonByIdQuery: jest.fn(),
}));

describe("PokemonDetail Component", () => {
  const mockPokemonData = {
    name: "pikachu",
    height: 4,
    weight: 60,
    sprites: {
      other: {
        dream_world: {
          front_default: "https://example.com/pikachu.png",
        },
      },
    },
    types: [{ type: { name: "electric" } }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<PokemonDetail pokemonId="1" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<PokemonDetail pokemonId="1" />);
    expect(
      screen.getByText(/error loading pokémon details/i)
    ).toBeInTheDocument();
  });

  test("renders pokemon details", () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      error: null,
      isLoading: false,
    });

    render(<PokemonDetail pokemonId="1" />);
    expect(screen.queryAllByText(/pikachu/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/height/i)).toHaveTextContent("Height");
    expect(screen.getByText(/weight/i)).toHaveTextContent("Weight");
    expect(screen.getByText(/types/i)).toHaveTextContent("Types");
    expect(screen.getByRole("img", { name: /pikachu/i })).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png"
    );
  });

  test("renders no pokemon selected message", () => {
    (useFetchPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(<PokemonDetail pokemonId="1" />);
    expect(screen.getByText(/select a pokemon/i)).toBeInTheDocument();
  });
});
