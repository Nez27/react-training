import { useCallback, useMemo } from 'react';

// Helpers
import { formatCurrency } from '@helper/helper';

// Types
import { TBookingResponse } from '@type/booking';

// Components
import Modal from '@component/Modal';
import Table from '@component/Table';
import Menus from '@component/Menus';
import { RiEditBoxFill } from 'react-icons/ri';
import { TbArrowNarrowRight } from 'react-icons/tb';

// Hooks

// Constants
import { FORM } from '@constant/commons';
import BookingForm from './BookingForm';

interface IBookingRow {
  booking: TBookingResponse;
}

const BookingRow = ({ booking }: IBookingRow) => {
  const { id, users, startDate, endDate, rooms, amount, status } = booking;
  // const { isDeleting, deleteRoom } = useDeleteBooking();
  const statusText = status ? 'Check in' : 'Check out';
  const formattedPrice = useMemo(() => formatCurrency(amount), [amount]);
  const renderEditBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button onClick={onCloseModal} icon={<RiEditBoxFill />}>
        Edit
      </Menus.Button>
    ),
    []
  );

  return (
    <Table.Row>
      <div>{users?.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {startDate} &nbsp; <TbArrowNarrowRight />
        &nbsp; {endDate}
      </div>
      <div>{rooms?.name}</div>
      <div>{formattedPrice}</div>
      <div>{statusText}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />

            <Menus.List id={id.toString()}>
              <Modal.Open
                modalName={FORM.EDIT}
                renderChildren={renderEditBtn}
              />
            </Menus.List>

            <Modal.Window name={FORM.EDIT} title="Edit Booking">
              <BookingForm booking={booking} key={booking.id} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default BookingRow;
