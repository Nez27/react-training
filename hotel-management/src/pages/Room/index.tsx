// Components
import RoomTable from './RoomTable';
import RoomForm from './RoomForm';
import Modal from '@component/Modal';

// Styled
import { StyledRoom, Title } from './styled';
import Direction from '@commonStyle/Direction.ts';
import Button from '@commonStyle/Button';

const Room = () => {
  return (
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
            <RoomForm />
          </Modal.Window>
        </Modal>
      </Direction>

      <RoomTable />
    </StyledRoom>
  );
};

export default Room;
