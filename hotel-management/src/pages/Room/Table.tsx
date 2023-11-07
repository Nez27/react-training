import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Components
import { RiEditBoxFill } from 'react-icons/ri';
import { HiTrash } from 'react-icons/hi';
import { StyledOperationTable } from './styled';
import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Direction from '../../commons/styles/Direction';
import Message from '../../components/Message';
import Search from '../../components/Search';
import SortBy from '../../components/SortBy';
import OrderBy from '../../components/OrderBy';

// Types
import { IRoom } from '../../types/rooms';

// Constants
import { useFetch } from '../../hooks/useFetch';
import { ROOM_PATH } from '../../constants/path';
import { STATUS_CODE } from '../../constants/responseStatus';
import { CONFIRM_DELETE, DELETE_SUCCESS } from '../../constants/messages';
import { ORDERBY_OPTIONS, ROOM_PAGE } from '../../constants/variables';

// Styled
import Spinner from '../../commons/styles/Spinner';

// Helpers
import { sendRequest } from '../../helpers/sendRequest';
import { formatCurrency } from '../../helpers/helper';
import Modal from '../../components/Modal';
import RoomForm from './Form';

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
              <RoomForm room={room} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

interface IRoomTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const RoomTable = ({ reload, setReload }: IRoomTable) => {
  const [nameSearch, setNameSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const sortByValue = searchParams.get('sortBy')
    ? searchParams.get('sortBy')!
    : '';
  const orderByValue = searchParams.get('orderBy')
    ? searchParams.get('orderBy')!
    : '';

  const { data, isPending, errorFetchMsg } = useFetch(
    'rooms',
    'name',
    nameSearch,
    sortByValue,
    orderByValue,
    reload
  );

  useEffect(() => {
    if (data) {
      setRooms(data);
    } else {
      setRooms([]);
    }

    if (errorFetchMsg) {
      console.error(errorFetchMsg);
    }
  }, [data, errorFetchMsg]);

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={ROOM_PAGE.SORTBY_OPTIONS} />
          <Search
            setValueSearch={setNameSearch}
            setPlaceHolder="Search by name..."
          />
        </StyledOperationTable>

        {isPending && <Spinner />}

        {rooms.length ? (
          <Menus>
            <Table columns="10% 40% 20% 20% 5%">
              <Table.Header>
                <div>Id</div>
                <div>Name</div>
                <div>Price</div>
                <div>Status</div>
              </Table.Header>
              <Table.Body<IRoom>
                data={rooms}
                render={(room: IRoom) => (
                  <RoomRow
                    room={room}
                    key={room.id}
                    reload={reload}
                    setReload={setReload}
                  />
                )}
              />
            </Table>
          </Menus>
        ) : (
          !isPending && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default RoomTable;
