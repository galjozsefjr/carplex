'use client';

import { ChakraProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { theme } from './theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ChakraProvider cssVarsRoot="body" theme={theme}>
    {children}
  </ChakraProvider>
);
