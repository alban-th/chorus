import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../../types";

const getPokemons = async () => {
    const response = await fetch('/api/pokemon');
    if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
    }
    return (await response.json()) as Pokemon[];
}

export function usePokemons() {
  const { isFetching, isError, data } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
  });

  return {
    pokemons: data,
    state: { isFetching, isError },
  };
}