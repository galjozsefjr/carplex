'use client';

import { AddIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { type FC, useCallback } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import { Pagination } from '@/components/pagination/pagination';
import { useScreenings } from '@/hooks/useScreenings';
import { ScreeningList } from './ScreeningList';

export const ScreeningsPage: FC = () => {
  const { data: searchResult } = useScreenings({ periodStart: new Date() });
  const { user } = useAuthContext();
  const { push: navigate } = useRouter();

  const gotoPage = useCallback(
    (page: number) => {
      const url = new URL(window.location.href);
      navigate(`${url.pathname}?page=${page}`);
    },
    [navigate]
  );

  if (!searchResult) {
    // return loading skeleton
    return null;
  }

  const { total, last_page, current_page, data: screenings } = searchResult;

  return (
    <Box backgroundColor="background.dark" width="full">
      <Container maxWidth="6xl" paddingY="5">
        <Flex alignItems="center" justifyContent="space-between" marginY="5">
          <Text>
            <strong>{total}</strong> vetítést találtunk
          </Text>
          {user && (
            <IconButton
              aria-label="Új előadás hozzáadása"
              borderRadius="50%"
              icon={<AddIcon />}
              onClick={() => {
                return;
              }}
            />
          )}
        </Flex>
        <ScreeningList screenings={screenings} />
        <Box marginTop="12">
          <Pagination currentPage={current_page} goto={gotoPage} total={last_page} />
        </Box>
      </Container>
    </Box>
  );
};
