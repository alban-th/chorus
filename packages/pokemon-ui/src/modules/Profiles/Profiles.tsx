import React from 'react';
import { ProfileList } from '../../components/ProfileList';
import { useProfiles } from './useProfiles';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 1rem;
`;

export function Profiles() {
  const { status, error, profiles, currentProfileId } = useProfiles();

  if (status.isFetching && !status.isPending) {
    return <div>Loading...</div>;
  }

  if (profiles === undefined || error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Container>
      <ProfileList profiles={profiles} selectedProfileId={currentProfileId} />
    </Container>
  );
}
