// Components
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';
import SortBy from '@src/components/SortBy';
import OrderBy from '@src/components/OrderBy';

// Types
import { IRoom } from '@src/types/room';
import { ColumnProps } from '@src/types/common';

// Constants
import { ORDERBY_OPTIONS, ROOM_PAGE } from '@src/constants/commons';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@src/commons/styles/Direction';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useRooms } from '@src/hooks/rooms/useRooms';

interface IRoomTable extends Omit<IRoom, 'status'>{
  status: string;
  onClick: () => void;
}

const RoomTable = () => {
  const columns: ColumnProps[] = [
    {
      key: 'id',
      title: 'Id',
      width: 10,
    },
    {
      key: 'name',
      title: 'Name',
      width: 40,
    },
    {
      key: 'price',
      title: 'Price',
      width: 20,
    },
    {
      key: 'status',
      title: 'Status',
      width: 20,
    },
  ];
  const { isLoading, rooms, count } = useRooms();

  const tempRooms = rooms?.map((room) => ({
    ...room,
    status: room.status 
      ? 'Unavailable' 
      : 'Available',
    onClick: () => console.log(room),
  }));

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={ROOM_PAGE.SORTBY_OPTIONS} />
          <Search setPlaceHolder="Search by name..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {tempRooms && tempRooms.length ? (
          <Table<IRoomTable> columns={columns} rows={tempRooms} count={count}/>
        ) : (
          !isLoading && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default RoomTable;
