import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import SortBy from '@component/SortBy';
import OrderBy from '@component/OrderBy';
import RoomRow from './RoomRow';

// Types
import { IRoom } from '@type/rooms';

// Constants
import { ORDERBY_OPTIONS, ROOM_PAGE } from '@constant/commons';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@commonStyle/Direction';
import Spinner from '@commonStyle/Spinner';


interface IRoomTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const RoomTable = ({ reload, setReload }: IRoomTable) => {
  const columnName = ['Id', 'Name', 'Price', 'Status'];
  const [nameSearch, setNameSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const sortByValue = searchParams.get('sortBy')
    ? searchParams.get('sortBy')!
    : '';
  const orderByValue = searchParams.get('orderBy')
    ? searchParams.get('orderBy')!
    : '';
    
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
              <Table.Header headerColumn={columnName}/>
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
