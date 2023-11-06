import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  forwardRef,
  useEffect,
} from 'react';

// Components
import Dialog from '../../components/Dialog';
import UserForm from './Form';

// Types
import { Nullable } from '../../types/common';
import { IUser } from '../../types/users';

// Hooks
import { useForwardRef } from '../../hooks/useForwardRef';

interface IUserDialog {
  onClose: () => void;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  ref: MutableRefObject<Nullable<HTMLDialogElement>>;
  user: Nullable<IUser>;
  isAdd: boolean;
}

const UserDialog = forwardRef<HTMLDialogElement, IUserDialog>((props, ref) => {
  const dialogRef = useForwardRef(ref);

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
});

export default UserDialog;
