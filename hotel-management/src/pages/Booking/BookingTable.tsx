import { useCallback } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import Pagination from '@component/Pagination';
import BookingRow from './BookingRow';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@commonStyle/Direction';
import Spinner from '@commonStyle/Spinner';

// Hooks
import { useBookings } from '@hook/bookings/useBookings';

// Types
import { TBookingResponse } from '@type/booking';

const BookingTable = () => {
  const columnName = [
    'User',
    'Date',
    'Room',
    'Amount',
    'Status'
  ];
  const { 
    isLoading,
    bookings,
    count
  } = useBookings();

  const renderBookingRow = useCallback(
    (booking: TBookingResponse) => (
      <BookingRow booking={booking} key={booking.id} />
    ),
    []
  );

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <Search setPlaceHolder="Search by name..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {bookings && bookings.length ? (
          <Menus>
            <Table columns="15% 25% 20% 15% 10% 10% 5%">
              <Table.Header headerColumn={columnName} />
              <Table.Body<TBookingResponse>
                data={bookings}
                render={renderBookingRow}
              />
              <Table.Footer>
                <Pagination count={count!} />
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

export default BookingTable;
