import { AspectRatio, Box, Flex, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NavLink from 'next/link';
import type { FC } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import type { Movie } from '@/types/Movie';
import { MovieListItemMenu } from './movieEditor/MovieListItemMenu';
//import { useAuthContext } from '../../auth/auth.context';
//import { MovieListItemMenu } from './MovieListItemMenu';

export interface MovieListItemProps {
  movie: Movie;
  openEditor?: (movie: Movie) => void;
}

export const MovieListItem: FC<MovieListItemProps> = ({ movie, openEditor }) => {
  const releaseDate = new Date(movie.release_date);
  const { user } = useAuthContext();
  return (
    <Box position="relative">
      {user && <MovieListItemMenu movie={movie} openEditor={openEditor} />}
      <LinkBox>
        <AspectRatio marginBottom={7} ratio={322 / 455}>
          <Image src={movie.poster_path} />
        </AspectRatio>
        <Flex gap="2" justifyContent="space-between" opacity={0.5}>
          <Heading as="header" display="flex" flexDirection="column" flexGrow={1} gap={2}>
            <Text as="h4" fontSize="lg" fontWeight="medium" lineHeight="7">
              <LinkOverlay as={NavLink} href={`/movie/${movie.id}`}>
                {movie.title}
              </LinkOverlay>
            </Text>
            {movie.tagline && (
              <Text fontSize="sm" marginRight="-12">
                {movie.tagline}
              </Text>
            )}
          </Heading>
          <Text
            as="time"
            dateTime={releaseDate.toISOString().split('T')[0]}
            sx={{
              border: 'solid 1px',
              borderColor: 'border.default',
              borderRadius: 4,
              fontSize: 'xs',
              flexShrink: 0,
              height: 7,
              paddingX: 2,
              paddingY: 1,
              textWrap: 'nowrap',
              width: 12
            }}
          >
            {releaseDate.getFullYear()}
          </Text>
        </Flex>
      </LinkBox>
    </Box>
  );
};
