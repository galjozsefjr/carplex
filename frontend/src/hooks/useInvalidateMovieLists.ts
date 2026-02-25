import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export const useInvalidateMovieLists = () => {
  const { mutate } = useSWRConfig();
  return useCallback(() => {
    return mutate(
      (key) => {
        if (typeof key !== 'string') {
          return false;
        }
        return key.startsWith('/api/movies?') && key.includes('page=');
      },
      undefined,
      { revalidate: true }
    );
  }, [mutate]);
};
