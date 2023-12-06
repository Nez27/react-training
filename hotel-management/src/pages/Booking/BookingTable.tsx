import { useCallback } from 'react';

// Components
import Menus from '@src/components/Menus';
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';
import Pagination from '@src/components/Pagination';
import BookingRow from './BookingRow';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@src/commons/styles/Direction';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useBookings } from '@src/hooks/bookings/useBookings';

// Types
import { TBookingResponse } from '@src/types/booking';

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
