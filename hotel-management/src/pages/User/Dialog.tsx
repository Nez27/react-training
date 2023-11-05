import { forwardRef, useEffect } from 'react';

// Components
import Dialog from '../../components/Dialog';
import UserForm from './Form';

// Types
import { TUser } from '../../globals/types';
import { useForwardRef } from '../../hooks/useForwardRef';

interface IUserDialog {
  onClose: () => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.MutableRefObject<HTMLDialogElement | null>;
  user: TUser | null;
  isAdd: boolean;
}

const UserDialog = forwardRef((props, ref) => {
  const dialogRef = useForwardRef(ref);

  // prettier-ignore
  const { 
    onClose,
    setReload,
    reload,
    user,
    isAdd,
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
        user={user}
        isAdd={isAdd!}
      />
    </Dialog>
  );
}) as React.FC<IUserDialog>;

export default UserDialog;
