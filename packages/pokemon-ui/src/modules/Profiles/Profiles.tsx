import React from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Profile } from '../../types';
import { ProfileList } from '../../components/ProfileList/ProfileList';

const getProfiles = async (): Promise<Profile[]> => {
  const response = await fetch('/api/profile');
  return await response.json();
};

export function Profiles() {
  const { status, error, data } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if(data === undefined || error) {
    return <div>Error: {error?.message}</div>;
  }

  return <ProfileList profiles={data} />;
}
