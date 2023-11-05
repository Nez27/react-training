import { forwardRef } from 'react';

// Styled
import { StyledBody, StyledDialog, StyledTitle } from './styled';

export interface IDialogProps {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  onClose?: () => void;
  ref?: React.MutableRefObject<HTMLDialogElement | null>;
}

const Dialog = forwardRef((props: IDialogProps, ref) => {
  const { title, children, onClose } = props;
  return (
    <StyledDialog
      ref={ref as React.LegacyRef<HTMLDialogElement> | undefined}
      onClose={onClose}
    >
      <StyledTitle>{title}</StyledTitle>
      <StyledBody>{children}</StyledBody>
    </StyledDialog>
  );
});

export default Dialog;
