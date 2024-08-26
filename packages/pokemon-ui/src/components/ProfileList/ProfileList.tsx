import React from 'react';
import { User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Profile } from '../../types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type ProfileListProps = {
  profiles: Profile[];
  selectedProfileId?: string;
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
  border: 1px solid #ccc;
  color: #555;
  padding: 0.5rem;
  margin: 0 0.2rem;


  text-decoration: none;

  &:hover {
    background-color: #f3f3f3;
  }
  &:last-child::before {
    display: block;
    content: '';
    flex: 1;
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

const selected = css`
  background-color: #f3f3f3;
`;

export function ProfileList({ profiles, selectedProfileId = '' }: ProfileListProps) {
  return (
    <Ul className="">
      {profiles.map(({ id, name, pokemons }) => (
        <Li key={id}>
          <Anchor
            to={`/team-editor/${id}`}
            css={parseInt(selectedProfileId) === parseInt(id) ? selected : null}
          >
            <User />
            <Name>{name}</Name>
            <Number>{pokemons.length}</Number>
          </Anchor>
        </Li>
      ))}
      <div css={css`flex: 1;`} />
      <Li>
        <Anchor to={`/add-profile`}>
          <Plus />
          <Name>Add Profile</Name>
        </Anchor>
      </Li>
    </Ul>
  );
}
