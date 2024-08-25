import React from 'react';
import { User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Profile } from '../../types';
import styled from '@emotion/styled';

export type ProfileListProps = {
  profiles: Profile[];
};

const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  padding: 0;
`;
const Anchor = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: middle;
  border: 1px solid #eee;
  border-right: none;
  padding: 0.5rem;

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

const Number = styled.span`
  margin-left: 0.5rem;
  display: flex;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #ccc;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

export function ProfileList({ profiles }: ProfileListProps) {
  return (
    <Ul className="">
      {profiles.map(({ id, name, pokemons }) => (
        <Li key={id}>
          <Anchor to={`/edit-profile/${id}`}>
            <User />
            <Name>{name}</Name>
            <Number>{pokemons.length}</Number>
          </Anchor>
        </Li>
      ))}
      <Li>
        <Anchor to={`/add-profile`}>
          <Plus />
          <Name>Add Profile</Name>
        </Anchor>
      </Li>
    </Ul>
  );
}
