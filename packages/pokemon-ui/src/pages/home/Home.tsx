import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useProfiles } from '../../modules/Profiles';
import styled from '@emotion/styled';

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 1rem;
  width: 100%;
`;
const Li = styled.li`
  padding: 0.5rem;
  width: calc((100vw - 2rem) / 2);
  height: 10vw;

  @media (min-width: 700px) {
    width: calc((100vw - 2rem) / 4);
  }
  @media (min-width: 1200px) {
    width: calc((100vw - 2rem) / 6);
  }
`;
const Anchor = styled(Link)`
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
  font-size: 1.1rem;
  font-weight: bold;
`;

export function Home() {
  const { profiles, status } = useProfiles();
  const navigate = useNavigate();

  if (status.isFetching) {
    return <div>Loading...</div>;
  }

  if (profiles?.length === 0) {
    navigate('/create-profile');
  }

  return (
    <div>
      <h1>Pick a trainer</h1>
      <Ul>
        {profiles?.map((profile) => (
          <Li>
            <Anchor to={`/edit-profile/${profile.id}`}>
              <Name>{profile.name}</Name>
            </Anchor>
          </Li>
        ))}
      </Ul>
    </div>
  );
}
