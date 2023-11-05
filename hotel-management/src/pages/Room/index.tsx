import { useRef, useState } from 'react';

// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import RoomTable from './Table';

// Styled
import { StyledRoom, Title } from './styled';
import RoomDialog from './Dialog';

// Types
import { TRoom } from '../../globals/types';

const Room = () => {
  const dialogRef = useRef<HTMLDialogElement>();
  const [reload, setReload] = useState(true);
  const [room, setRoom] = useState<TRoom | null>(null);
  const [isAdd, setIsAdd] = useState(false);

  const openFormDialog = (isAddForm: boolean = false) => {
    setIsAdd(isAddForm);
    dialogRef.current?.showModal();
  };

  const closeFormDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <StyledRoom>
        <Direction type="horizontal">
          <Title>List Room</Title>
          <Button onClick={() => openFormDialog(true)}>Add room</Button>
        </Direction>

        <RoomTable
          reload={reload}
          setReload={setReload}
          openFormDialog={() => openFormDialog()}
          setRoom={setRoom}
        />
      </StyledRoom>

      <RoomDialog
        onClose={closeFormDialog}
        ref={dialogRef}
        setReload={setReload}
        reload={reload}
        room={room}
        isAdd={isAdd}
      />
    </>
  );
};

export default Room;
