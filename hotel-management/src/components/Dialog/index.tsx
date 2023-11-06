import { MutableRefObject, ReactNode, forwardRef } from 'react';

// Styled
import { StyledBody, StyledDialog, StyledTitle } from './styled';

// Type
import { Nullable } from '../../types/common';

export interface IDialogProps {
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  ref?: MutableRefObject<Nullable<HTMLDialogElement>>;
}

const Dialog = forwardRef<HTMLDialogElement, IDialogProps>(
  (props: IDialogProps, ref) => {
    const { title, children, onClose } = props;

    return (
      <StyledDialog ref={ref} onClose={onClose}>
        <StyledTitle>{title}</StyledTitle>
        <StyledBody>{children}</StyledBody>
      </StyledDialog>
    );
  }
);

export default Dialog;
