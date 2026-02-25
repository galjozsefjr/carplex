import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import type { FC } from 'react';
import type { CreateMovie, Movie } from '@/types/Movie';
import { MovieEditorFeedback } from './MovieEditorFeedback';
import { MovieEditorForm, type MovieEditorStatus } from './MovieEditorForm';

export interface MovieEditorModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movie: CreateMovie) => Promise<Movie>;
  status?: MovieEditorStatus;
}

export const MovieEditorModal: FC<MovieEditorModalProps> = ({ isOpen, movie, onClose, onSubmit, status }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="5xl">
    <ModalOverlay />
    <ModalContent padding={6}>
      <ModalHeader fontSize="4xl">{movie ? 'Film módosítása' : 'Film hozzáadása'}</ModalHeader>
      <ModalCloseButton size="sm" />
      <ModalBody marginBottom={6}>
        {status ? <MovieEditorFeedback status={status} /> : <MovieEditorForm movie={movie} onCancel={onClose} onSubmit={onSubmit} />}
      </ModalBody>
    </ModalContent>
  </Modal>
);
