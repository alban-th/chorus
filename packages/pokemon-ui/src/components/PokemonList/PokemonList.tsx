import React, { useCallback } from 'react';
import { PawPrint, Plus } from 'lucide-react';
import type { Pokemon } from '../../types';
import styled from '@emotion/styled';

const Ul = styled.ul`
  display: flex;
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
`;
const Li = styled.li`
  padding: 0;
  flex: 1;
  max-width: calc(20% - 1rem);
  margin: 0.5rem;
  height: 2rem;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-right: none;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  

  &:last-child {
    border-right: 1px solid #eee;
  }

  text-decoration: none;
  color: #333;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Name = styled.span`
  margin-left: 0.5rem;
`;

export type PokemonListProps = {
  pokemons: Pokemon[];
  onDelete: (id: string) => void;
  shouldShowAdd: boolean;
  onAdd: () => void;
};

export function PokemonList({
  onAdd,
  onDelete,
  pokemons,
  shouldShowAdd,
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
          <Button type="button" onClick={deletePokemon(id)}>
            <PawPrint />
            <Name>{name}</Name>
          </Button>
        </Li>
      ))}
      {shouldShowAdd && (
        <Li>
          <Button onClick={onAdd}>
            <Plus />
            <Name>Add Pokemon</Name>
          </Button>
        </Li>
      )}
    </Ul>
  );
}
