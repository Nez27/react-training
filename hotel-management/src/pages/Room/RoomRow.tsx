import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

// Constants
import { ROOM_PATH } from '../../constants/path';
import { STATUS_CODE } from '../../constants/responseStatus';
import { CONFIRM_DELETE, DELETE_SUCCESS } from '../../constants/messages';

// Helpers
import { sendRequest } from '../../helpers/sendRequest';
import { formatCurrency } from '../../helpers/helper';
import Modal from '../../components/Modal';
import RoomForm from './RoomForm';

// Types
import { IRoom } from '../../types/rooms';

// Components
import Table from '../../components/Table';
import Menus from '../../components/Menus';
import { RiEditBoxFill } from 'react-icons/ri';
import { HiTrash } from 'react-icons/hi';

interface IRoomRow {
  room: IRoom;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const RoomRow = ({ room, reload, setReload }: IRoomRow) => {
  const handleDelete = async (room: IRoom) => {
    if (confirm(CONFIRM_DELETE)) {
      const response = await sendRequest(ROOM_PATH + `/${room.id}`, 'DELETE');

      if (response.statusCode === STATUS_CODE.OK) {
        toast.success(DELETE_SUCCESS);

        // Reload table
        setReload(!reload);
      }
    }
  };

  const { id, name, finalPrice, status } = room;

  const statusText = status ? 'Unavailable' : 'Available';

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{formatCurrency(finalPrice)}</div>
      <div>{statusText}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />

            <Menus.List id={id.toString()}>
              <Modal.Open modalName="edit">
                <Menus.Button icon={<RiEditBoxFill />}>Edit</Menus.Button>
              </Modal.Open>

              <Menus.Button
                icon={<HiTrash />}
                onClick={() => handleDelete(room)}
              >
                Delete
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="edit" title="Edit Room">
              <RoomForm roomEdit={room} setReload={setReload} reload={reload} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default RoomRow;
