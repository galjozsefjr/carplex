'use client';

import { Button, Flex, Input } from '@chakra-ui/react';
import { type ChangeEvent, type FC, type SubmitEvent, useCallback, useState } from 'react';

export type SearchBoxProps = Readonly<{
  query: string;
  onSearch: (query: string) => void;
}>;

export const SearchBox: FC<SearchBoxProps> = ({ query, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const onSubmit = useCallback(
    (event: SubmitEvent) => {
      event.preventDefault();
      onSearch(searchQuery);
    },
    [searchQuery, onSearch]
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <Flex as="form" gap={4} onSubmit={onSubmit}>
      <Input onChange={onChange} placeholder="Mit szeretnél nézni?" size="lg" value={searchQuery} variant="search" />
      <Button size="lg" type="submit" width={233}>
        Keresés
      </Button>
    </Flex>
  );
};
