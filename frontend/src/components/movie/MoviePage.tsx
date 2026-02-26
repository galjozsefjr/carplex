'use client';

import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMovie } from '@/hooks/useMovie';
import { useScreenings } from '@/hooks/useScreenings';
import { MovieDescription } from './MovieDescription';
import { MovieScreeningsList } from './MovieScreeningsList';
import { MovieSkeleton } from './MovieSkeleton';

type MoviePageProps = Readonly<{
  movieId: string;
}>;

export const MoviePage: FC<MoviePageProps> = ({ movieId }) => {
  const { data: movie, error } = useMovie(movieId);
  const { data: screenings } = useScreenings({ movieId, periodStart: new Date() });

  if (!movie) {
    if (error) {
      return null;
    }
    return <MovieSkeleton />;
  }

  return (
    <Box>
      <MovieDescription movie={movie} />
      {screenings?.data && screenings.data.length > 0 && <MovieScreeningsList screenings={screenings.data} />}
    </Box>
  );
};
