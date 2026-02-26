import useSWRMutation from 'swr/mutation';
import { useAuthContext } from '@/auth/auth.context';
import type { CreateScreening, Screening } from '@/types/Screening';
import { ApiError } from './apiError';
import { authorizedFetcher } from './fetcher';

export const useAddScreening = () => {
  const { authToken } = useAuthContext();

  return useSWRMutation<Screening, ApiError, string, CreateScreening>(`/api/screenings`, async (url, { arg }) => {
    if (!authToken) {
      throw new ApiError({ message: 'Unauthorized' }, 401);
    }
    const screening = await authorizedFetcher(url, authToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    });
    return screening;
  });
};
