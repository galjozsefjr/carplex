import { Box } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';
import backgroundImage from '@/images/netflix-roulette.png';

export const SearchLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box backgroundColor="background.dark" overflow="hidden" position="relative" width="full">
    <Box
      backgroundImage={backgroundImage.src}
      backgroundPosition="10%"
      backgroundRepeat="no-repeat"
      backgroundSize="105%"
      filter="blur(3px)"
      height="full"
      opacity="30%"
      position="absolute"
      width="full"
      zIndex="0"
    />
    {children}
  </Box>
);
