'use client';

import type { FC } from 'react';
import { useMovie } from '@/hooks/useMovie';
import { MovieDescription } from './MovieDescription';
import { MovieSkeleton } from './MovieSkeleton';

type MoviePageProps = Readonly<{
  movieId: string;
}>;

export const MoviePage: FC<MoviePageProps> = ({ movieId }) => {
  const { data: movie, error } = useMovie(movieId);

  if (!movie) {
    if (error) {
      return null;
    }
    return <MovieSkeleton />;
  }

  return <MovieDescription movie={movie} />;
};
