import { AspectRatio, Box, Container, Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';

export const MovieListSkeleton = () => {
  const movies = new Array(6).fill(0).map((_, index) => index);
  return (
    <Box backgroundColor="background.dark" marginTop="5" width="full">
      <Container maxWidth="6xl" paddingY="5">
        <Flex alignItems="center" justifyContent="space-between" marginY="5">
          <Skeleton height="6" width="150px" />
        </Flex>
        <Grid
          sx={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12
          }}
        >
          {movies.map((movie) => (
            <GridItem key={movie}>
              <Box>
                <AspectRatio marginBottom={7} ratio={322 / 455}>
                  <Skeleton width="full" />
                </AspectRatio>
                <Flex gap="2" justifyContent="space-between" opacity={0.5}>
                  <Box as="header" display="flex" flexDirection="column" flexGrow={1} gap={2}>
                    <Skeleton height="7" width="70%" />
                    <Skeleton height="4" width="50%" />
                  </Box>
                  <Skeleton height="7" width="12" />
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
