import { Breadcrumb, BreadcrumbItem, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { FC } from 'react';

export const HeaderNavigationBar: FC = () => {
  return (
    <Flex flexGrow={1} justifyContent="left">
      <Flex alignItems="left" direction="column">
        <Breadcrumb fontWeight="bold" pt="1" separator=" " spacing="1">
          <BreadcrumbItem>
            <NextLink href="/">Filmek</NextLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <NextLink href="/screenings">Előadások</NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    </Flex>
  );
};
