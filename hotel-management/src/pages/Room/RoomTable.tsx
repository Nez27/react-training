import { useCallback } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import SortBy from '@component/SortBy';
import OrderBy from '@component/OrderBy';
import RoomRow from './RoomRow';

// Types
import { IRoom } from '@type/room';

// Constants
import { ORDERBY_OPTIONS, ROOM_PAGE } from '@constant/commons';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@commonStyle/Direction';
import Spinner from '@commonStyle/Spinner';

// Hooks
import { useRooms } from '@hook/rooms/useRooms';
import Pagination from '@component/Pagination';

const RoomTable = () => {
  const columnName = ['Id', 'Name', 'Price', 'Status'];
  const {
    isLoading,
    rooms,
    count
  } = useRooms();

  const renderRoomRow = useCallback(
    (room: IRoom) => <RoomRow room={room} key={room.id} />,
    []
  );

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={ROOM_PAGE.SORTBY_OPTIONS} />
          <Search setPlaceHolder="Search by name..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {rooms && rooms.length ? (
          <Menus>
            <Table columns="10% 40% 20% 20% 5%">
              <Table.Header headerColumn={columnName} />
              <Table.Body<IRoom> data={rooms} render={renderRoomRow} />
              <Table.Footer>
                <Pagination count={count!}/>
              </Table.Footer>
            </Table>
          </Menus>
        ) : (
          !isLoading && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default RoomTable;
