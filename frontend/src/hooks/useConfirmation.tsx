import { type FC, useState } from 'react';
import { ConfirmationDialog } from './ConfirmationDialog';

export const useConfirmation = (title: string, message?: string) => {
  const [resolve, setResolve] = useState<((isConfirmed: boolean) => void) | null>(null);

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setResolve(() => resolve);
    });
  };

  const handleClose = () => setResolve(null);

  const onConfirm = () => {
    resolve?.(true);
    handleClose();
  };

  const onCancel = () => {
    resolve?.(false);
    handleClose();
  };

  const Dialog: FC = () => <ConfirmationDialog isVisible={!!resolve} message={message} onCancel={onCancel} onConfirmed={onConfirm} title={title} />;

  return { Dialog, confirm };
};
