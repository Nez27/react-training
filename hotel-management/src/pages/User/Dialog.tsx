import { forwardRef, useEffect } from 'react';

// Components
import Dialog from '../../components/Dialog';
import UserForm from './Form';

// Interfaces
import { IDialogProps } from '../../globals/interfaces';

// Types
import { TUser } from '../../globals/types';

const UserDialog = forwardRef((props, ref) => {
  const dialogRef = ref as React.MutableRefObject<
    HTMLDialogElement | undefined
  >;

  // prettier-ignore
  const { 
    onClose,
    setReload,
    reload,
    data,
    isAdd 
  } = props;

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener('click', (e: MouseEvent) => {
        const dialogDimensions = dialogRef.current!.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current!.close();
        }
      });
    }
  }, [dialogRef]);

  return (
    <Dialog title={'Add user'} onClose={onClose} ref={dialogRef}>
      <UserForm
        onClose={onClose!}
        reload={reload!}
        setReload={setReload!}
        user={data}
        isAdd={isAdd!}
      />
    </Dialog>
  );
}) as React.FC<IDialogProps<TUser>>;

export default UserDialog;
