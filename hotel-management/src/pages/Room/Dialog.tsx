import { forwardRef, useEffect } from 'react';

// Components
import Dialog, { IDialogProps } from '../../components/Dialog';
import RoomForm from './Form';

// Types
import { TRoom } from '../../globals/types';

const RoomDialog = forwardRef((props, ref) => {
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
    <Dialog title={'Add room'} onClose={onClose} ref={dialogRef}>
      <RoomForm
        onClose={onClose!}
        reload={reload!}
        setReload={setReload!}
        room={data}
        isAdd={isAdd!}
      />
    </Dialog>
  );
}) as React.FC<IDialogProps<TRoom>>;

export default RoomDialog;
