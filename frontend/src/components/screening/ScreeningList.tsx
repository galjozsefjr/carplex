import { Box, Heading, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import type { Screening } from '@/types/Screening';
import { formatDate, localizedFormat } from '@/utils/date';
import { ScreeningListItem } from './ScreeningListItem';

export type ScreeningListProps = Readonly<{
  screenings: Screening[];
}>;

export const ScreeningList: FC<ScreeningListProps> = ({ screenings }) => {
  const groups = screenings.reduce(
    (dayGroups, screening) => {
      const startDay = formatDate(screening.start_time);
      dayGroups[startDay] = [...(dayGroups[startDay] ?? []), screening];
      return dayGroups;
    },
    {} as Record<string, Screening[]>
  );
  return (
    <VStack gap="4" width="full">
      {Object.entries(groups).map(([day, screenings]) => (
        <Box as="section" display="flex" flexDirection="column" gap="4" key={day} width="full">
          <Heading as="h2" borderBottom="solid 1px" paddingBottom="5">
            {localizedFormat(day, 'MMMM D, dddd')}
          </Heading>
          {screenings.map((screening) => (
            <ScreeningListItem key={screening.id} screening={screening} />
          ))}
        </Box>
      ))}
    </VStack>
  );
};
