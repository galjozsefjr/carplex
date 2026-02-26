'use client';

import { AddIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { type FC, useCallback, useState } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import { Pagination } from '@/components/pagination/pagination';
import { useInvalidateMovieLists } from '@/hooks/useInvalidateMovieLists';
import { useMovies } from '@/hooks/useMovies';
import type { Movie } from '@/types/Movie';
import { MovieList } from './MovieList';
import { MovieListSkeleton } from './MovieListSkeleton';
import { MovieEditor } from './movieEditor/MovieEditor';

export type MovieListContainerProps = Readonly<{
  page: number;
}>;

export const MovieListContainer: FC<MovieListContainerProps> = ({ page }) => {
  const { data: searchResult } = useMovies(page, { refreshInterval: 0, revalidateOnFocus: false });
  const { user } = useAuthContext();
  const { push: navigate } = useRouter();
  const gotoPage = useCallback(
    (page: number) => {
      const url = new URL(window.location.href);
      navigate(`${url.pathname}?page=${page}`);
    },
    [navigate]
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | null | false>(false);
  const invalidateMoviesList = useInvalidateMovieLists();
  const closeEditor = useCallback(() => {
    setSelectedMovie(false);
    invalidateMoviesList();
  }, [invalidateMoviesList]);

  if (!searchResult) {
    return <MovieListSkeleton />;
  }

  const { last_page, data: movies } = searchResult;
  return (
    <Box backgroundColor="background.dark" marginTop="5" width="full">
      <Container maxWidth="6xl" paddingY="5">
        <Flex alignItems="center" justifyContent="space-between" marginY="5">
          <Text>
            <strong>{searchResult.total}</strong> filmet találtunk
          </Text>
          {user && <IconButton aria-label="Új film hozzáadása" borderRadius="50%" icon={<AddIcon />} onClick={() => setSelectedMovie(null)} />}
        </Flex>
        <MovieList movies={movies} openEditor={setSelectedMovie} />
        <Box marginTop="12">
          <Pagination currentPage={searchResult.current_page} goto={gotoPage} total={last_page} />
        </Box>
      </Container>
      <MovieEditor movie={selectedMovie} onClose={closeEditor} />
    </Box>
  );
};
