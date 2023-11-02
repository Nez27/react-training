import { forwardRef } from 'react';

// Styled
import { StyledBody, StyledDialog, StyledTitle } from './styled';

export interface IDialogProps<T> {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  onClose?: () => void;
  reload?: boolean;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.MutableRefObject<HTMLDialogElement | undefined>;
  data?: T | null;
  isAdd?: boolean;
}

const Dialog = forwardRef((props, ref) => {
  const { title, children, onClose } = props as IDialogProps<unknown>;
  return (
    <StyledDialog
      ref={ref as React.LegacyRef<HTMLDialogElement> | undefined}
      onClose={onClose}
    >
      <StyledTitle>{title}</StyledTitle>
      <StyledBody>{children}</StyledBody>
    </StyledDialog>
  );
}) as React.FC<IDialogProps<unknown>>;

export default Dialog;
