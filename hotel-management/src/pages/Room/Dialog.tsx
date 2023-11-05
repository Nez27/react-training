import { forwardRef, useEffect } from 'react';

// Components
import Dialog from '../../components/Dialog';
import RoomForm from './Form';
import { TRoom } from '../../globals/types';


interface IRoomDialog {
  onClose?: () => void;
  reload?: boolean;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.MutableRefObject<HTMLDialogElement | null>;
  room?: TRoom | null;
  isAdd?: boolean;
}

const RoomDialog = forwardRef((props: IRoomDialog, ref) => {
  const dialogRef = ref as React.MutableRefObject<
    HTMLDialogElement | undefined
  >;
  // prettier-ignore
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
});

export default RoomDialog;
