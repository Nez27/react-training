import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  forwardRef,
  useEffect,
} from 'react';

// Components
import Dialog from '../../components/Dialog';
import RoomForm from './Form';

// Types
import { Nullable } from '../../types/common';
import { TRoom } from '../../types/rooms';

// Hooks
import { useForwardRef } from '../../hooks/useForwardRef';

interface IRoomDialog {
  onClose?: () => void;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  ref?: MutableRefObject<Nullable<HTMLDialogElement>>;
  room?: Nullable<TRoom>;
  isAdd?: boolean;
}

const RoomDialog = forwardRef<HTMLDialogElement, IRoomDialog>(
  (props: IRoomDialog, ref) => {
    const dialogRef = useForwardRef(ref);
    const { 
      onClose,
      setReload,
      reload,
      room,
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
      <Dialog title={'Add room'} onClose={onClose} ref={dialogRef}>
        <RoomForm
          onClose={onClose!}
          reload={reload!}
          setReload={setReload!}
          room={room}
          isAdd={isAdd!}
        />
      </Dialog>
    );
  }
);

export default RoomDialog;
