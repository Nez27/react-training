import { useCallback } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import SortBy from '@component/SortBy';
import OrderBy from '@component/OrderBy';

// Types

// Constants
import { ORDERBY_OPTIONS, ROOM_PAGE } from '@constant/commons';

// Styled
import { StyledOperationTable } from './styled';
import Direction from '@commonStyle/Direction';
import Spinner from '@commonStyle/Spinner';

// Hooks
import Pagination from '@component/Pagination';
import { useBookings } from '@hook/bookings/useBookings';
import { TBookingResponse } from '@type/booking';
import BookingRow from './BookingRow';

const BookingTable = () => {
  const columnName = ['User', 'Date', 'Room', 'Amount', 'Status'];
  const { isLoading, bookings, count } = useBookings();

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
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={ROOM_PAGE.SORTBY_OPTIONS} />
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
