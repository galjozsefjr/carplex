import useSWR from 'swr';
import type { ScreeningListResult } from '@/types/Screening';
import { formatDate } from '@/utils/date';
import type { ApiError } from './apiError';
import { fetcher } from './fetcher';

type UseScreenings = Readonly<{
  page?: number;
  movieId?: number | string;
  periodStart?: Date;
  periodEnd?: Date;
}>;

export const useScreenings = <Data = ScreeningListResult, Error = ApiError>({ movieId, periodStart, periodEnd, page = 1 }: UseScreenings = {}) => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', `${page}`);
  movieId && queryParams.append('movie', `${movieId}`);
  periodStart && queryParams.append('period_start', formatDate(periodStart));
  periodEnd && queryParams.append('period_end', formatDate(periodEnd));
  const searchParams = queryParams.toString();

  return useSWR<Data, Error>(`/api/screenings?${searchParams}`, fetcher, { revalidateOnFocus: false, refreshInterval: 0 });
};
