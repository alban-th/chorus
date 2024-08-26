import React from 'react';

import { usePokemons } from '../../modules/Pokemons';
import { useProfile } from '../../modules/Profile';
import { PokemonList } from '../../components/PokemonList';
import { PokemonPicker } from '../../components/PokemonPicker';
import styled from '@emotion/styled';

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const FullMess = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
`;

export function EditProfile() {
  const { profile, state: profileState, addPokemon, deletePokemon } = useProfile();
  const { pokemons, state: pokemonsState } = usePokemons();

  if (profileState.isFetching) {
    return <div>Loading...</div>;
  }

  if (profile === undefined || profileState.isError) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <Title>{profile.name}</Title>
      <hr />
      <PokemonList pokemons={profile.pokemons} onDelete={deletePokemon} />
      <hr />
      {pokemons && !pokemonsState.isFetching && profile.pokemons.length < 6 ? (
        <PokemonPicker pokemons={pokemons} onPick={addPokemon} />
      ) : (
        <FullMess>Your roaster is full!</FullMess>
      )}
    </div>
  );
}
