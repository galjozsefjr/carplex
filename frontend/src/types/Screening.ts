import type { Movie } from './Movie';
import type { Paginated } from './Paginated';

export type Screening = {
  id: number;
  movie_id: number;
  movie: Movie;
  start_time: string;
  end_time: string;
  capacity: number;
  created_at: string;
  updated_at: string;
};

export type CreateScreening = Omit<Screening, 'id' | 'created_at' | 'updated_at' | 'movie'>;

export type ScreeningListResult = Paginated<Screening>;
