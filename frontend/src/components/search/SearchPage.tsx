'use client';
import { Container, Heading } from '@chakra-ui/react';
import type { FC } from 'react';
import { SearchBox } from './SearchBox';

export const SearchPage: FC = () => {
  const onSearch = () => {
    // @todo
  };
  return (
    <Container maxWidth="4xl" paddingY="16" position="relative" zIndex="1">
      <Heading as="h3" fontSize="4xl" fontWeight="normal" marginBottom="9" textTransform="uppercase">
        Válassz a filmek közül
      </Heading>
      <SearchBox onSearch={onSearch} query={''} />
    </Container>
  );
};
