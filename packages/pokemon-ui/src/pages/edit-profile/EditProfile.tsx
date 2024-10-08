import React, { useMemo } from 'react';

import { usePokemons } from '../../modules/Pokemons';
import { useProfile } from '../../modules/Profile';
import { PokemonList } from '../../components/PokemonList';
import { PokemonPicker } from '../../components/PokemonPicker';
import styled from '@emotion/styled';
import { Pokemon } from '../../types';

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
  const {
    profile,
    state: profileState,
    addPokemon,
    deletePokemon,
    isPending,
    pendingVariables,
  } = useProfile();
  const { pokemons, state: pokemonsState } = usePokemons();

  const pendingPokemon: Pokemon | undefined = useMemo(
    () =>
      !isPending
        ? undefined
        : pokemons?.find((p) => p.id === pendingVariables.addPokemon),
    [isPending, pendingVariables.addPokemon, pokemons]
  ); 

  if (profileState.isFetching && !isPending) {
    return <div>Loading... </div>;
  }

  if (profile === undefined || profileState.isError) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <Title>{profile.name}</Title>
      <hr />
      <PokemonList
        pokemons={profile.pokemons}
        pendingPokemon={pendingPokemon}
        onDelete={deletePokemon}
      />
      <hr />
      {pokemons && !pokemonsState.isFetching && profile.pokemons.length < 6 ? (
        <PokemonPicker pokemons={pokemons} onPick={addPokemon} />
      ) : (
        <FullMess>Your roaster is full!</FullMess>
      )}
    </div>
  );
}
