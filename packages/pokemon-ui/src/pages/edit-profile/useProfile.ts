import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Profile } from '../../types';

const getProfile = async (id: string): Promise<Profile> => {
  const response = await fetch(`/api/profile/${id}`);
  if (!response.ok) {
    throw new Error('Profile not found');
  }
  return await response.json();
};

const addPokemon = (profileId: string) => async (pokemonId: string) => {
  const response = await fetch(
    `/api/profile/${profileId}/pokemons/${pokemonId}`,
    {
      method: 'PUT',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to add pokemon');
  }
  return (await response.json()) as Profile;
};
const deletePokemon = (profileId: string) => async (pokemonId: string) => {
  const response = await fetch(
    `/api/profile/${profileId}/pokemons/${pokemonId}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to delete pokemon');
  }
  return (await response.json()) as Profile;
};

export function useProfile() {
  const { profileId: pid } = useParams();
  const profileId = pid || '-1';

  const queryClient = useQueryClient();
  const { isFetching, isError, data } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId),
  });

  const addPokemonMutation = useMutation<Profile, Error, string>({
    mutationFn: addPokemon(profileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
  const deletePokemonMutation = useMutation<Profile, Error, string>({
    mutationFn: deletePokemon(profileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  return {
    profileId,
    profile: data,
    state: { isFetching, isError },
    addPokemon: addPokemonMutation.mutate,
    deletePokemon: deletePokemonMutation.mutate,
  };
}
