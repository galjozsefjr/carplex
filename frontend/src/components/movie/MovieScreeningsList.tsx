import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import type { FC } from 'react';
import type { Screening } from '@/types/Screening';
import { localizedFormat } from '@/utils/date';

export type MovieScreeningsListProps = Readonly<{
  screenings: Screening[];
}>;

export const MovieScreeningsList: FC<MovieScreeningsListProps> = ({ screenings }) => {
  return (
    <Box background="background.dark" pb={10} px={16} width="full">
      <Heading as="h3" marginBottom={5}>
        Előadások
      </Heading>
      <UnorderedList>
        {screenings.map((screening) => (
          <ListItem key={screening.id}>{localizedFormat(screening.start_time, 'MMMM D, dddd - HH:mm')}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
