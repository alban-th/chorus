import { useQuery } from '@tanstack/react-query';
import type { Profile } from '../../types';
import { useParams } from 'react-router-dom';

const getProfiles = async (): Promise<Profile[]> => {
  const response = await fetch('/api/profile');
  return await response.json();
};

export function useProfiles() {
  const { profileId } = useParams();
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  return {
    currentProfileId: profileId,
    error,
    profiles: data,
    status: { isFetching, isError },
  };
}
