import { forwardRef } from 'react';

// Components
import { IDialogProps } from '../../globals/interfaces';

// Styled
import { StyledBody, StyledDialog, StyledTitle } from './styled';

const Dialog = forwardRef((props, ref) => {
  const { title, children, onClose } = props as IDialogProps;
  return (
    <StyledDialog
      ref={ref as React.LegacyRef<HTMLDialogElement> | undefined}
      onClose={onClose}
    >
      <StyledTitle>{title}</StyledTitle>
      <StyledBody>{children}</StyledBody>
    </StyledDialog>
  );
}) as React.FC<IDialogProps>;

export default Dialog;
