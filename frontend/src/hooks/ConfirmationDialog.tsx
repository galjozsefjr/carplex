import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { type FC, useRef } from 'react';

export interface ConfirmationDialogProps {
  isVisible: boolean;
  message?: string;
  title: string;
  onConfirmed: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ title, message, isVisible, onConfirmed, onCancel }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose } = useDisclosure({
    isOpen: isVisible,
    onClose: onCancel
  });

  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} size="md">
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton size="sm" />
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter gap="3">
          <Button onClick={onClose} ref={cancelRef} variant="secondary">
            Mégsem
          </Button>
          <Button onClick={onConfirmed} variant="primary">
            Ok
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
