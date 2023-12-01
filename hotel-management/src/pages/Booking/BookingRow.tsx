import toast from 'react-hot-toast';
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
import { ImExit } from 'react-icons/im';
import BookingForm from './BookingForm';
import ConfirmMessage from '@component/ConfirmMessage';

// Hooks
import useCheckOut from '@hook/bookings/useCheckout';

// Constants
import { FORM } from '@constant/commons';

interface IBookingRow {
  booking: TBookingResponse;
}

const BookingRow = ({ booking }: IBookingRow) => {
  const { checkOutBooking } = useCheckOut();
  const {
    id,
    users,
    startDate,
    endDate,
    rooms,
    amount,
    status
  } = booking;
  const formattedPrice = useMemo(() => formatCurrency(amount), [amount]);
  const renderEditBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button
        onClick={onCloseModal}
        icon={<RiEditBoxFill />}
        disabled={!status}
      >
        Edit
      </Menus.Button>
    ),
    [status]
  );

  const renderCheckOutBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button 
        onClick={onCloseModal}
        icon={<ImExit />}
        disabled={!status}
      >
        Checkout
      </Menus.Button>
    ),
    [status]
  );

  const handleClickCheckOutBtn = useCallback(() => {
    if (booking.status) {
      checkOutBooking({
        idBooking: booking.id,
        roomId: booking!.rooms!.id,
        userId: booking!.users!.id,
      });
    } else {
      toast.error('User already checkout!');
    }
  }, [booking, checkOutBooking]);

  return (
    <Table.Row>
      <div>{users?.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {startDate} &nbsp; <TbArrowNarrowRight />
        &nbsp; {endDate}
      </div>
      <div>{rooms?.name}</div>
      <div>{formattedPrice}</div>
      <div>{
          status
            ? 'Check in'
            : 'Check out'
        }</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />

            <Menus.List id={id.toString()}>
              <Modal.Open
                modalName={FORM.EDIT}
                renderChildren={renderEditBtn}
              />

              <Modal.Open
                modalName={FORM.CHECKOUT}
                renderChildren={renderCheckOutBtn}
              />
            </Menus.List>

            <Modal.Window name={FORM.EDIT} title="Edit Booking">
              <BookingForm booking={booking} key={booking.id} />
            </Modal.Window>

            <Modal.Window name={FORM.CHECKOUT} title="Checkout">
              <ConfirmMessage
                message={`Are you sure to checkout this user? '${booking.users?.name}'`}
                onConfirm={handleClickCheckOutBtn}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default BookingRow;
