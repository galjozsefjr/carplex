import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast } from '@chakra-ui/react';
import type { FC } from 'react';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useDeleteMovie } from '@/hooks/useDeleteMovie';
import type { Movie } from '@/types/Movie';

export interface MovieListItemMenuProps {
  movie: Movie;
  openEditor?: (movie: Movie) => void;
}

export const MovieListItemMenu: FC<MovieListItemMenuProps> = ({ movie, openEditor }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deleteMovie } = useDeleteMovie();
  const { Dialog, confirm } = useConfirmation('Film törlése', `Biztosan törölni akarja a(z) ${movie.title} filmet?`);
  const toast = useToast();

  const handleDelete = async () => {
    const approved = await confirm();
    if (approved) {
      toast.promise(deleteMovie(movie.id), {
        success: () => {
          return { title: 'Sikeres törlés', description: 'A film törlése sikeresen megtörtént', duration: 3000 };
        },
        error: { title: 'Hiba történt', description: 'A film törlése során hiba történt', duration: 3000 },
        loading: { title: 'Kis türelmet', description: 'Törlés folyamatban...' }
      });
    }
  };

  return (
    <Box position="absolute" right="2" top="2" zIndex="10">
      <Menu isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="bottom-end">
        <MenuButton as={IconButton} icon={<HamburgerIcon color="text.highlighted" />} variant="secondary" />
        <MenuList>
          <MenuItem
            onClick={() => {
              openEditor?.(movie);
            }}
          >
            Módosítás
          </MenuItem>
          <MenuItem onClick={handleDelete}>Film törlése</MenuItem>
        </MenuList>
      </Menu>
      <Dialog />
    </Box>
  );
};
