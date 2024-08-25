import React from 'react';
import { Profile } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PokemonList } from '../../components/PokemonList';

const getProfile = async (id: string): Promise<Profile> => {
  const response = await fetch(`/api/profile/${id}`);
  if (!response.ok) {
    throw new Error('Profile not found');
  }
  return await response.json();
};

export function EditProfile() {
  const { profileId } = useParams();
  const { isFetching, error, data } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId || '-1'),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (data === undefined || error) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>Selected Pokemons</h2>
      <PokemonList
        pokemons={data.pokemons}
        shouldShowAdd={data.pokemons.length < 6}
        onAdd={() => console.log('add')}
        onDelete={console.log}
      />
    </div>
  );
}
