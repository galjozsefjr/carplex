import useSWR, { type SWRConfiguration } from 'swr';
import type { MovieListResult } from '@/types/Movie';
import type { ApiError } from './apiError';
import { fetcher } from './fetcher';

const GET_MOVIES_PATH = '/api/movies';

export const useMovies = <Data = MovieListResult, Error = ApiError>(page?: number, swrConfig?: SWRConfiguration<Data, Error>) => {
  const params = new URLSearchParams();
  if (page) {
    params.append('page', `${page}`);
  }
  const queryParams = params.toString();
  return useSWR<Data, Error>(queryParams ? `${GET_MOVIES_PATH}?${queryParams}` : GET_MOVIES_PATH, fetcher, swrConfig);
};
