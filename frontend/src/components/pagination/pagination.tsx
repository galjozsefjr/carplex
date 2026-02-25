import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, type ButtonProps, IconButton, ListItem, UnorderedList } from '@chakra-ui/react';
import type { FC } from 'react';

export interface PaginationProps {
  total: number;
  currentPage: number;
  maxPages?: number;
  goto: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ goto, total, currentPage, maxPages = 10 }) => {
  const pages = new Array(Math.min(maxPages, total)).fill(0).map((_, index) => index + 1);

  return (
    <UnorderedList as="nav" display="flex" gap="2" justifyContent="space-between" listStyleType="none" marginLeft="0">
      <ListItem>
        <IconButton {...buttonStyle} aria-label="Előző" icon={<ArrowBackIcon />} isDisabled={currentPage <= 1} onClick={() => goto(currentPage - 1)} />
      </ListItem>
      <UnorderedList display="flex" gap="2" listStyleType="none" marginLeft="0">
        {pages.map((page) => (
          <ListItem key={page}>
            {page === currentPage ? (
              <Button {...buttonStyle} variant="primary">
                {page}
              </Button>
            ) : (
              <Button {...buttonStyle} onClick={() => goto(page)}>
                {page}
              </Button>
            )}
          </ListItem>
        ))}
      </UnorderedList>
      <ListItem>
        <IconButton
          {...buttonStyle}
          aria-label="Következő"
          icon={<ArrowForwardIcon />}
          isDisabled={currentPage >= total}
          onClick={() => goto(currentPage + 1)}
        />
      </ListItem>
    </UnorderedList>
  );
};

const buttonStyle: ButtonProps = {
  size: 'md',
  borderRadius: '50%',
  width: '3em',
  height: '3em',
  overflow: 'hidden',
  variant: 'secondary'
};
