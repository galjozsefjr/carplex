import type { Certification } from './Certification';

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

export type MovieListResult = {
  current_page: number;
  first_page_url: string;
  from: number;
  to: number;
  per_page: number;
  total: number;
  last_page: number;
  data: Movie[];

  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
};
