import React from 'react';

import { usePokemons } from '../../modules/Pokemons';
import { useProfile } from '../../modules/Profile';
import { PokemonList } from '../../components/PokemonList';
import { PokemonPicker } from '../../components/PokemonPicker';

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
      <h1>{profile.name}</h1>
      <h2>Selected Pokemons</h2>
      <PokemonList
        pokemons={profile.pokemons}
        onDelete={deletePokemon}
      />
      {pokemons && !pokemonsState.isFetching && profile.pokemons.length < 6 && (
        <PokemonPicker pokemons={pokemons} onPick={addPokemon} />
      )}
    </div>
  );
}
