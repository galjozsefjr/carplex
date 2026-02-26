import type { Certification } from './Certification';
import type { Paginated } from './Paginated';

export type Movie = {
  id: number;
  title: string;
  tagline?: string;
  release_date: string;
  poster_path: string;
  overview: string;
  runtime: number;
  certification: Certification | null;
  created_at: string;
  updated_at: string;
};

export type CreateMovie = Omit<Movie, 'id' | 'created_at' | 'updated_at'>;

export type MovieListResult = Paginated<Movie>;
