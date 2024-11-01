import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_POKEMON_API_BASE_URL }),
  endpoints: (builder) => ({
    fetchPokemonList: builder.query({
      query: () => "pokemon",
    }),
    fetchPokemonById: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useFetchPokemonByIdQuery, useFetchPokemonListQuery } = pokemonApi;
