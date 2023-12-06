import { useCallback, useMemo } from 'react';

// Helpers
import { formatCurrency } from '@src/helpers/helper';

// Types
import { IRoom } from '@src/types/room';

// Components
import RoomForm from './RoomForm';
import Modal from '@src/components/Modal';
import Table from '@src/components/Table';
import Menus from '@src/components/Menus';
import { RiEditBoxFill } from 'react-icons/ri';
import { HiTrash } from 'react-icons/hi';
import ConfirmMessage from '@src/components/ConfirmMessage';

// Hooks
import { useSetIsDeleteRoom } from '@src/hooks/rooms/useSetIsDeleteRoom';

// Constants
import { FORM } from '@src/constants/commons';

interface IRoomRow {
  room: IRoom;
}

const RoomRow = ({ room }: IRoomRow) => {
  const { id, name, price, status } = room;
  const { setIsDeleteRoom } = useSetIsDeleteRoom();
  const formattedPrice = useMemo(() => formatCurrency(price), [price]);
  const renderEditBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        onClick={onOpenModal}
        icon={<RiEditBoxFill />}
        label={'Edit'}
      />
    ),
    []
  );
  const renderDeleteBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        icon={<HiTrash />}
        onClick={onOpenModal}
        disabled={status}
        label={'Delete'}
      />
    ),
    [status]
  );

  const renderRow = useCallback(
    (onCloseModal: () => void) => (
      <RoomForm room={room} onCloseModal={onCloseModal} />
    ),
    [room]
  );

  const renderConfirmMessage = useCallback(
    (onCloseModal: () => void) => (
      <ConfirmMessage
        message={`Are you sure to delete ${name}?`}
        onConfirm={() => setIsDeleteRoom(id)}
        onCloseModal={onCloseModal}
      />
    ),
    [id, name, setIsDeleteRoom]
  );

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{formattedPrice}</div>
      <div>{status ? 'Unavailable' : 'Available'}</div>

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

            <Modal.Window
              name={FORM.EDIT}
              title="Edit Room"
              renderChildren={renderRow}
            />

            <Modal.Window
              name={FORM.DELETE}
              title="Delete Room"
              renderChildren={renderConfirmMessage}
            />
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default RoomRow;
