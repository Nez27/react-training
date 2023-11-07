import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Components
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
import { ORDERBY_OPTIONS, ROOM_PAGE } from '../../constants/variables';

// Styled
import Spinner from '../../commons/styles/Spinner';
import RoomRow from './RoomRow';

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
