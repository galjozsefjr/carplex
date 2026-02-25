import { Heading, Link, Text } from '@chakra-ui/react';
import type { FC } from 'react';

export type CarPlexLogoProps = Readonly<{
  href?: string;
}>;

export const CarPlexLogo: FC<CarPlexLogoProps> = ({ href = '/' }) => (
  <Link _hover={{ textDecoration: 'none' }} href={href}>
    <Heading color="text.highlighted" fontSize="xl">
      <Text as="span" fontWeight="black">
        car
      </Text>
      <Text as="span" fontWeight="medium">
        plex
      </Text>
    </Heading>
  </Link>
);
