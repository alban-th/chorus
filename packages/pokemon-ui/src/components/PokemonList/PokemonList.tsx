import React, { useCallback } from 'react';
import { PawPrint } from 'lucide-react';
import type { Pokemon } from '../../types';
import styled from '@emotion/styled';
import { Item } from './Item';

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 1rem;
  width: 100%;
`;
const Li = styled.li`
  padding: 0;
  width: calc(33% - 1rem);
  height: 5rem;
  padding: 0.5rem;

  @media (min-width: 1200px) {
    width: calc((100vw - 2rem) / 6);
  }
`;


export type PokemonListProps = {
  pokemons: Pokemon[];
  onDelete: (id: string) => void;
};

export function PokemonList({
  onDelete,
  pokemons,
}: PokemonListProps) {
  const deletePokemon = useCallback(
    (id: string) => () => {
      onDelete(id);
    },
    [onDelete]
  );

  return (
    <Ul className="">
      {pokemons.map(({ id, name }) => (
        <Li key={id}>
          <Item id={id} name={name} deletePokemon={deletePokemon} />
        </Li>
      ))}
    </Ul>
  );
}
