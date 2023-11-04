import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Components
import { HiSquare2Stack } from 'react-icons/hi2';
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
import { TRoom } from '../../globals/types';

// Constants
import { useFetch } from '../../hooks/useFetch';
import { ROOM_PATH } from '../../constants/path';
import { STATUS_CODE } from '../../constants/statusCode';
import { CONFIRM_DELETE, DELETE_SUCCESS } from '../../constants/messages';
import { ROOM_PAGE } from '../../constants/variables';

// Styled
import Spinner from '../../commons/styles/Spinner';

// Utils
import { sendRequest } from '../../helpers/sendRequest';

interface IRoomRow {
  room: TRoom;
  openFormDialog: () => void;
  setRoom: React.Dispatch<React.SetStateAction<TRoom | null>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomRow = ({
  room,
  openFormDialog,
  setRoom,
  reload,
  setReload,
}: IRoomRow) => {
  const handleOnEdit = (room: TRoom) => {
    setRoom(room);
    openFormDialog();
  };

  const handleOnDelete = async (room: TRoom) => {
    if (confirm(CONFIRM_DELETE)) {
      const response = await sendRequest(
        ROOM_PATH + `/${room.id}`,
        null,
        'DELETE',
      );

      if (response.statusCode === STATUS_CODE.OK) {
        toast.success(DELETE_SUCCESS);

        // Reload table
        setReload(!reload);
      }
    }
  };

  const { id, name, price, status } = room;

  // prettier-ignore
  const statusText = status
    ? 'Unavailable' 
    : 'Available';

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{statusText}</div>

      <Menus.Menu>
        <Menus.Toggle id={id.toString()} />

        <Menus.List id={id.toString()}>
          <Menus.Button
            icon={<HiSquare2Stack />}
            onClick={() => handleOnEdit(room)}
          >
            Edit
          </Menus.Button>
          <Menus.Button icon={<HiTrash />} onClick={() => handleOnDelete(room)}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

interface IRoomTable {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  openFormDialog: () => void;
  setRoom?: React.Dispatch<React.SetStateAction<TRoom | null>>;
}

const RoomTable = ({
  reload,
  setReload,
  openFormDialog,
  setRoom,
}: IRoomTable) => {
  const [nameSearch, setNameSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<TRoom[]>([]);
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
    reload,
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
          <OrderBy options={ROOM_PAGE.ORDERBY_OPTIONS} />

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
              <Table.Body<TRoom>
                data={rooms}
                render={(room: TRoom) => (
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
