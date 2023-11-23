import { memo } from 'react';

// Styled
import { StyledConfirmDelete } from './styled';

// Component
import Button from '@commonStyle/Button';

interface IConfirmMessage {
  message: string;
  disabled: boolean;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

const ConfirmMessage = memo(
  ({ message, disabled, onConfirm, onCloseModal }: IConfirmMessage) => {
    return (
      <StyledConfirmDelete>
        <p>{message}</p>

        <div>
          <Button variations="danger" disabled={disabled} onClick={onConfirm}>
            Delete
          </Button>
          <Button
            variations="secondary"
            disabled={disabled}
            onClick={onCloseModal}
          >
            Cancel
          </Button>
        </div>
      </StyledConfirmDelete>
    );
  }
);

export default ConfirmMessage;
