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
import { Nullable } from '../../types/common';
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

interface IRoomRow {
  room: IRoom;
  openFormDialog: () => void;
  setRoom: Dispatch<SetStateAction<Nullable<IRoom>>>;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const RoomRow = ({
  room,
  openFormDialog,
  setRoom,
  reload,
  setReload,
}: IRoomRow) => {
  const handleEdit = (room: IRoom) => {
    setRoom(room);
    openFormDialog();
  };

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

  const statusText = status
    ? 'Unavailable' 
    : 'Available';

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{formatCurrency(finalPrice)}</div>
      <div>{statusText}</div>

      <Menus.Menu>
        <Menus.Toggle id={id.toString()} />

        <Menus.List id={id.toString()}>
          <Menus.Button
            icon={<RiEditBoxFill />}
            onClick={() => handleEdit(room)}
          >
            Edit
          </Menus.Button>
          <Menus.Button icon={<HiTrash />} onClick={() => handleDelete(room)}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

interface IRoomTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  openFormDialog: () => void;
  setRoom?: Dispatch<SetStateAction<Nullable<IRoom>>>;
}

const RoomTable = ({
  reload,
  setReload,
  openFormDialog,
  setRoom,
}: IRoomTable) => {
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
                    openFormDialog={openFormDialog}
                    setRoom={setRoom!}
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
