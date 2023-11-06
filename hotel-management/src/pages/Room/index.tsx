import { useRef, useState } from 'react';

// Components
import RoomTable from './Table';

// Styled
import { StyledRoom, Title } from './styled';
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import RoomDialog from './Dialog';

// Types
import { Nullable } from '../../types/common';
import { IRoom } from '../../types/rooms';

const Room = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reload, setReload] = useState(true);
  const [room, setRoom] = useState<Nullable<IRoom>>(null);
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
