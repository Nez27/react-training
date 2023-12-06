import { useCallback } from 'react';

// Components
import Menus from '@src/components/Menus';
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';
import SortBy from '@src/components/SortBy';
import OrderBy from '@src/components/OrderBy';
import RoomRow from './RoomRow';

// Types
import { IRoom } from '@src/types/room';

// Constants
import { ORDERBY_OPTIONS, ROOM_PAGE } from '@src/constants/commons';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@src/commons/styles/Direction';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useRooms } from '@src/hooks/rooms/useRooms';
import Pagination from '@src/components/Pagination';

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
