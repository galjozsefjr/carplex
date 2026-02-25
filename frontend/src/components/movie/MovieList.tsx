import { Grid, GridItem } from '@chakra-ui/react';
import type { FC } from 'react';
import type { Movie } from '@/types/Movie';
import { MovieListItem } from './MovieListItem';

export interface MovieListProps {
  movies: Movie[];
  openEditor?: (movie: Movie) => void;
}

export const MovieList: FC<MovieListProps> = ({ movies, openEditor }) => (
  <Grid
    sx={{
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12
    }}
  >
    {movies.map((movie) => (
      <GridItem key={movie.id}>
        <MovieListItem movie={movie} openEditor={openEditor} />
      </GridItem>
    ))}
  </Grid>
);
