import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { useAuthContext } from '@/auth/auth.context';
import { ApiError } from './apiError';
import { authorizedFetcher } from './fetcher';
import { useInvalidateMovieLists } from './useInvalidateMovieLists';

export const useDeleteMovie = () => {
  const { authToken } = useAuthContext();
  const { mutate } = useSWRConfig();
  const invalidateLists = useInvalidateMovieLists();
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<ApiError>();
  const deleteMovie = useCallback(
    async (movieId: number) => {
      try {
        setError(undefined);
        if (!authToken) {
          throw new ApiError({ message: 'Unauthorized' }, 401);
        }
        const PATH = `/api/movies/${movieId}`;
        setIsMutating(true);
        await authorizedFetcher(PATH, authToken, { method: 'DELETE' });
        invalidateLists();
        mutate(PATH, undefined, { revalidate: false });
      } catch (error) {
        console.error(error);
        setError(error as ApiError);
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [mutate, invalidateLists, authToken]
  );

  return {
    error,
    isMutating,
    deleteMovie
  };
};
