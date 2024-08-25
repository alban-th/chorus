import React from 'react';
import { Profile } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Profiles } from '../../modules/Profiles';

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
      <Profiles />
      <h2>Trainer</h2>
      <p>Username: {data.name}</p>
      <h2>Pokemons</h2>
      <ul>
        {data.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
