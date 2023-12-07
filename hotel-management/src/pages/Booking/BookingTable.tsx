// Components
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@src/commons/styles/Direction';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useBookings } from '@src/hooks/bookings/useBookings';

// Types
import { ColumnProps } from '@src/types/common';
import { formatCurrency } from '@src/helpers/helper';

interface IBookingTable {
  user: string;
  date: string;
  room: string;
  amount: string;
  status: string;
  onClick: () => void;
}

const BookingTable = () => {
  const columns: ColumnProps[] = [
    {
      key: 'user',
      title: 'User',
      width: 15,
    },
    {
      key: 'date',
      title: 'Date',
      width: 25,
    },
    {
      key: 'room',
      title: 'Room',
      width: 20,
    },
    {
      key: 'amount',
      title: 'Amount',
      width: 15,
    },
    {
      key: 'status',
      title: 'Status',
      width: 15,
    },
  ];

  const { isLoading, bookings, count } = useBookings();

  const tempBookings = bookings?.map((booking) => ({
    date: 'Error',
    amount: formatCurrency(booking.amount),
    room: booking.rooms!.name,
    user: booking.users!.name,
    status: booking.status ? 'Check in' : 'Check out',
    onClick: () => console.log(booking),
  }));

  return (  
    <>
      <Direction>
        <StyledOperationTable>
          <Search setPlaceHolder="Search by name..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {tempBookings && tempBookings.length ? (
          <Table<IBookingTable>
            columns={columns}
            rows={tempBookings}
            count={count}
          />
        ) : (
          !isLoading && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default BookingTable;
