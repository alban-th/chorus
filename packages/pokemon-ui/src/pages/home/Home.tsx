import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useProfiles } from '../../modules/Profiles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PlusCircle } from 'lucide-react';

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
  border: 1px solid #888;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  border-radius: 0.3rem;

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
const Title = styled.h1`
  text-align: center;
  margin: 2rem;
`;
const SubTitle = styled.h2`
  text-align: center;
  margin: 2rem;
`;

const addNew = css`
  border: 1px solid #34442e;
  color: #34442e;
  fornt-weight: bold;
  background-color: #e4ede1;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.3rem;
`;

export function Home() {
  const { profiles, status } = useProfiles();
  const navigate = useNavigate();

  if (status.isFetching && !status.isPending) {
    return <div>Loading...</div>;
  }

  if (profiles?.length === 0) {
    setTimeout(() => navigate('/create-profile/'), 0);
    return <div>Redirecting...</div>;
  }
  //const profiles: {id: string, name: string}[] = [];

  return (
    <div>
      <Title>Welcome!</Title>
      <SubTitle>Pick a trainer</SubTitle>
      <Ul>
        {profiles?.map((profile) => (
          <Li key={profile.id}>
            <Anchor to={`/team-editor/${profile.id}`}>
              <Name>{profile.name}</Name>
            </Anchor>
          </Li>
        ))}
        <Li>
          <Anchor to={`/create-profile/`} css={addNew}>
            <PlusCircle />
            <Name>Create a New Profile</Name>
          </Anchor>
        </Li>
      </Ul>
    </div>
  );
}
