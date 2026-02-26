import { DeleteIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Flex, Heading, HStack, IconButton, Image, Text, useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import NavLink from 'next/link';
import { type FC } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useDeleteScreening } from '@/hooks/useDeleteScreening';
import type { Screening } from '@/types/Screening';
import { CertificationCircle } from '@/components/movie/CertificationCircle';

export type ScreeningListItemProps = Readonly<{
  screening: Screening;
}>;

export const ScreeningListItem: FC<ScreeningListItemProps> = ({ screening }) => {
  const { movie, start_time } = screening;
  const startTime = dayjs(start_time);
  const movieLink = `/movie/${movie.id}`;

  const toast = useToast();
  const { user } = useAuthContext();
  const { deleteScreening, isMutating } = useDeleteScreening();
  const { Dialog, confirm } = useConfirmation('Előadás törlése', `Biztosan törölni akarja az előadást?`);
  const handleDelete = async () => {
    const confirmed = await confirm();
    if (!confirmed) {
      return;
    }
    toast.promise(deleteScreening(screening.id), {
      success: () => {
        return { title: 'Sikeres törlés', description: 'Az előadás sikeresen törölve', duration: 3000 };
      },
      error: { title: 'Hiba történt', description: 'Az előadás törlése során hiba történt', duration: 3000 },
      loading: { title: 'Kis türelmet', description: 'Törlés folyamatban...' }
    });
  };

  return (
    <Box as="article" bgColor="background.dark" position="relative">
      {isMutating && <Box background="background.input" bottom={0} left="0" position="absolute" right={0} top={0}></Box>}
      <Flex gap={10} justifyContent="space-between">
        <AspectRatio flexBasis="30%" flexShrink={0} maxWidth={150} ratio={323 / 486}>
          <NavLink href={movieLink}>
            <Image src={movie.poster_path} />
          </NavLink>
        </AspectRatio>
        <Box flexGrow={1}>
          <HStack marginBottom={8} spacing="6">
            <CertificationCircle certification={movie.certification} fontSize="sm" size="2em" />
            <Box as="header">
              <Heading fontSize="2xl" textTransform="uppercase">
                <NavLink href={movieLink}>{movie.title}</NavLink>
              </Heading>
              {movie.tagline && <Text marginTop="2">{movie.tagline}</Text>}
            </Box>
          </HStack>
          <HStack as="time" fontSize="2xl" mb="7" spacing={12}>
            <Text as="span" color="text.highlighted">
              {startTime.format('HH:mm')}
            </Text>
            <Text as="span">{movie.runtime} perc</Text>
          </HStack>
        </Box>
        {user && <IconButton aria-label="Törlés" icon={<DeleteIcon />} onClick={handleDelete}></IconButton>}
      </Flex>
      <Dialog />
    </Box>
  );
};
