import useSWR from 'swr';
import type { Movie } from '@/types/Movie';
import type { ApiError } from './apiError';
import { fetcher } from './fetcher';

export const useMovie = <Data = Movie, Error = ApiError>(movieId?: string) => {
  return useSWR<Data, Error>(movieId ? `/api/movies/${movieId}` : null, fetcher);
};
