import { memo, useCallback } from 'react';

// Styled
import { StyledConfirmDelete } from './styled';

// Component
import Button from '@commonStyle/Button';

interface IConfirmMessage {
  message: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

const ConfirmMessage = memo(
  ({ message, onConfirm, onCloseModal }: IConfirmMessage) => {
    const handleConfirmBtn = useCallback(() => {
      onConfirm();
      onCloseModal!();
    }, [onCloseModal, onConfirm]);

    return (
      <StyledConfirmDelete>
        <p>{message}</p>

        <div>
          <Button variations="danger" onClick={handleConfirmBtn}>
            Yes
          </Button>
          <Button variations="secondary" onClick={onCloseModal}>
            No
          </Button>
        </div>
      </StyledConfirmDelete>
    );
  }
);

export default ConfirmMessage;
