import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useAuthContext } from '@/auth/auth.context';
import type { CreateMovie, Movie } from '@/types/Movie';
import { ApiError } from './apiError';
import { authorizedFetcher } from './fetcher';

export const useAddMovie = () => {
  const { authToken } = useAuthContext();
  const { mutate } = useSWRConfig();
  return useSWRMutation<Movie, ApiError, string, CreateMovie>(`/api/movies`, async (url, { arg }) => {
    if (!authToken) {
      throw new ApiError({ message: 'Unauthorized' }, 401);
    }
    const movie = await authorizedFetcher(url, authToken, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
    });
    mutate(`/api/movies/${movie.id}`, movie, { revalidate: false });
    return movie;
  });
};
