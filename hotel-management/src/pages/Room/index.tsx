// Components
import RoomTable from './RoomTable';
import RoomForm from './RoomForm';
import Modal from '@src/components/Modal';

// Styled
import { StyledRoom, Title } from './styled';
import Direction from '@src/commons/styles/Direction';
import Button from '@src/commons/styles/Button';

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
          <Modal.Window
            name="room-form"
            title="Add form"
            renderChildren={(onCloseModal) => (
              <RoomForm onCloseModal={onCloseModal} />
            )}
          />
        </Modal>
      </Direction>

      <RoomTable />
    </StyledRoom>
  );
};

export default Room;
