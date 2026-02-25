import { AspectRatio, Box, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react';
import type { FC } from 'react';

import type { Movie } from '@/types/Movie';
import { CertificationCircle } from './CertificationCircle';

export interface MovieDescriptionProps {
  movie: Movie;
}

const formatRuntime = (runtime: number | null): string => {
  if (!runtime) {
    return '';
  }
  const runtimeMins = runtime % 60;
  const runtimeHours = Math.round((runtime - runtimeMins) / 60);
  return `${runtimeHours}h ${runtimeMins}min`;
};

export const MovieDescription: FC<MovieDescriptionProps> = ({ movie }) => {
  const releaseDate = new Date(movie.release_date);
  return (
    <Box as="article" bgColor="background.dark" pb="7" pt="9" px="16">
      <Flex gap={10} justifyContent="space-between">
        <AspectRatio flexBasis="30%" flexShrink={0} ratio={323 / 486}>
          <Image src={movie.poster_path} />
        </AspectRatio>
        <Box flexGrow={1}>
          <HStack marginBottom={8} spacing="6">
            <CertificationCircle certification={movie.certification} />
            <Box as="header">
              <Heading fontSize="4xl" textTransform="uppercase">
                {movie.title}
              </Heading>
              {movie.tagline && <Text marginTop="2">{movie.tagline}</Text>}
            </Box>
          </HStack>
          <HStack as="time" color="text.highlighted" fontSize="2xl" mb="7" spacing={12}>
            <Text as="span">{releaseDate.getFullYear()}</Text>
            <Text as="span">{formatRuntime(movie.runtime)}</Text>
          </HStack>
          <Text fontSize="xl" opacity={0.5}>
            {movie.overview}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
