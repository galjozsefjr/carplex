import { AspectRatio, Box, Flex, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

export const MovieSkeleton = () => {
  return (
    <Box as="article" bgColor="background.dark" pb="7" pt="9" px="16">
      <Flex gap={10} justifyContent="space-between">
        <AspectRatio flexBasis="30%" flexShrink={0} ratio={323 / 486}>
          <Skeleton width="full" />
        </AspectRatio>
        <Box flexGrow={1}>
          <HStack marginBottom={8} spacing="6">
            <SkeletonCircle height="60px" width="60px" />
            <Box as="header" width="70%">
              <Skeleton height="44px" width="full" />
              <Skeleton height="6" marginTop="2" width="30%" />
            </Box>
          </HStack>
          <HStack as="time" color="text.highlighted" fontSize="2xl" mb="7" spacing={12}>
            <Skeleton height="9" width="132px" />
            <Skeleton height="9" width="160px" />
          </HStack>
          <Skeleton height="200" width="full" />
        </Box>
      </Flex>
    </Box>
  );
};
