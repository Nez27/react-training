import { useState } from 'react';

// Components
import RoomTable from './RomTable';
import RoomForm from './RoomForm';

// Styled
import { StyledRoom, Title } from './styled';
import Direction from '@commonStyle/Direction.ts';
import Button from '@commonStyle/Button';

// Types
import Modal from '@component/Modal';

const Room = () => {
  const [reload, setReload] = useState(true);

  return (
    <>
      <StyledRoom>
        <Direction type="horizontal">
          <Title>List Room</Title>

          <Modal>
            <Modal.Open
              modalName="room-form"
              renderChildren={(onCloseModal) => (
                <Button onClick={onCloseModal}>Add room</Button>
              )}
            />
            <Modal.Window name="room-form" title="Add form">
              <RoomForm setReload={setReload} reload={reload} />
            </Modal.Window>
          </Modal>
        </Direction>

        <RoomTable reload={reload} setReload={setReload} />
      </StyledRoom>
    </>
  );
};

export default Room;
