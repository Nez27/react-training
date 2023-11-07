import { useState } from 'react';

// Components
import RoomTable from './RomTable';

// Styled
import { StyledRoom, Title } from './styled';
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';

// Types
import Modal from '../../components/Modal';
import RoomForm from './RoomForm';

const Room = () => {
  const [reload, setReload] = useState(true);

  return (
    <>
      <StyledRoom>
        <Direction type="horizontal">
          <Title>List Room</Title>

          <Modal>
            <Modal.Open modalName="room-form">
              <Button>Add room</Button>
            </Modal.Open>
            <Modal.Window name="room-form" title="Add form">
              <RoomForm setReload={setReload} reload={reload} />
            </Modal.Window>
          </Modal>
        </Direction>

        <RoomTable
          reload={reload}
          setReload={setReload}
        />
      </StyledRoom>
    </>
  );
};

export default Room;
