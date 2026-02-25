import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import type { FC } from 'react';
import type { MovieEditorStatus } from './MovieEditorForm';

export interface MovieEditorFeedbackProps {
  status: MovieEditorStatus;
}

export const MovieEditorFeedback: FC<MovieEditorFeedbackProps> = ({ status }) => {
  const isError = status === 'error';
  const statusText = (() => {
    if (isError) {
      return 'A módosítás során hiba történt, kérjük próbálja újból!';
    }
    return status === 'added' ? 'A film sikeresen hozzáadásra került az adatbázisba' : 'A film módosítása sikeresen megtörtént';
  })();
  return (
    <VStack gap={8}>
      {isError ? (
        <IconButton
          aria-label="Bezárás"
          as={Box}
          backgroundColor="text.highlighted"
          borderRadius="50%"
          color="text.default"
          fontSize="3xl"
          height="2.1334em"
          icon={<CloseIcon />}
          width="2.1334em"
        />
      ) : (
        <Image alt="" height="48" src="/done.svg" width="48" />
      )}
      <Heading fontSize="4xl" textTransform="uppercase">
        {isError ? 'Hoppá!' : 'Gratulálunk'}
      </Heading>
      <Text fontSize="xl" maxWidth="15em" textAlign="center">
        {statusText}
      </Text>
    </VStack>
  );
};
