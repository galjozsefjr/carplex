import { useCallback, useState } from 'react';
import { useSWRConfig } from 'swr';
import { useAuthContext } from '@/auth/auth.context';
import { ApiError } from './apiError';
import { authorizedFetcher } from './fetcher';
import { useInvalidateScreeningLists } from './useInvalidateScreeningLists';

export const useDeleteScreening = () => {
  const { authToken } = useAuthContext();
  const { mutate } = useSWRConfig();
  const invalidateLists = useInvalidateScreeningLists();
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<ApiError>();
  const deleteScreening = useCallback(
    async (screeningId: number) => {
      try {
        setError(undefined);
        if (!authToken) {
          throw new ApiError({ message: 'Unauthorized' }, 401);
        }
        const PATH = `/api/screenings/${screeningId}`;
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
    deleteScreening
  };
};
