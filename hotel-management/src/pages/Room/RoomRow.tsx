import { useCallback, useMemo } from 'react';

// Helpers
import { formatCurrency } from '@helper/helper';

// Types
import { IRoom } from '@type/rooms';

// Components
import RoomForm from './RoomForm';
import Modal from '@component/Modal';
import Table from '@component/Table';
import Menus from '@component/Menus';
import { RiEditBoxFill } from 'react-icons/ri';
import { HiTrash } from 'react-icons/hi';
import ConfirmMessage from '@component/ConfirmMessage';

// Hooks
import { useDeleteRoom } from '@hook/rooms/useDeleteRoom';

// Constants
import { FORM } from '@constant/commons';

interface IRoomRow {
  room: IRoom;
}

const RoomRow = ({ room }: IRoomRow) => {
  const { id, name, price, status } = room;
  const { deleteRoom } = useDeleteRoom();
  const statusText = status 
    ? 'Unavailable' 
    : 'Available';
  const formattedPrice = useMemo(() => formatCurrency(price), [price]);
  const renderEditBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button onClick={onCloseModal} icon={<RiEditBoxFill />}>
        Edit
      </Menus.Button>
    ),
    []
  );
  const renderDeleteBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button icon={<HiTrash />} onClick={onCloseModal}>
        Delete
      </Menus.Button>
    ),
    []
  );

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{formattedPrice}</div>
      <div>{statusText}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />

            <Menus.List id={id.toString()}>
              <Modal.Open
                modalName={FORM.EDIT}
                renderChildren={renderEditBtn}
              />
              <Modal.Open
                modalName={FORM.DELETE}
                renderChildren={renderDeleteBtn}
              />
            </Menus.List>

            <Modal.Window name={FORM.EDIT} title="Edit Room">
              <RoomForm room={room} />
            </Modal.Window>

            <Modal.Window name={FORM.DELETE} title="Delete Room">
              <ConfirmMessage
                message={`Are you sure to delete ${name}?`}
                onConfirm={() => deleteRoom(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default RoomRow;
