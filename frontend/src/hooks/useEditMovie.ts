import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAuthContext } from '@/auth/auth.context';
import type { CreateMovie, Movie } from '@/types/Movie';
import { ApiError } from './apiError';
import { authorizedFetcher } from './fetcher';

export const useEditMovie = (movieId: number | null) => {
  const { authToken } = useAuthContext();
  const { mutate } = useSWRConfig();
  return useSWRMutation<Movie, ApiError, string, CreateMovie>(`/api/movies/${movieId}`, async (url, { arg }) => {
    if (!authToken) {
      throw new ApiError({ message: 'Unauthorized' }, 401);
    }
    const movie = await authorizedFetcher(url, authToken, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    });
    mutate(url, movie);
    return movie;
  });
};
