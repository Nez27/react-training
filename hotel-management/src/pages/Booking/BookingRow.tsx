import toast from 'react-hot-toast';
import { useCallback, useMemo } from 'react';

// Helpers
import { formatCurrency } from '@src/helpers/helper';

// Types
import { TBookingResponse } from '@src/types/booking';

// Components
import Modal from '@src/components/Modal';
import Table from '@src/components/Table';
import Menus from '@src/components/Menus';
import { RiEditBoxFill } from 'react-icons/ri';
import { TbArrowNarrowRight } from 'react-icons/tb';
import { ImExit } from 'react-icons/im';
import BookingForm from './BookingForm';
import ConfirmMessage from '@src/components/ConfirmMessage';

// Hooks
import useCheckOut from '@src/hooks/bookings/useCheckout';

// Constants
import { FORM } from '@src/constants/commons';

interface IBookingRow {
  booking: TBookingResponse;
}

const BookingRow = ({ booking }: IBookingRow) => {
  const { checkOutBooking } = useCheckOut();
  const { id, users, startDate, endDate, rooms, amount, status } = booking;
  const formattedPrice = useMemo(() => formatCurrency(amount), [amount]);
  const renderEditBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        onClick={onOpenModal}
        icon={<RiEditBoxFill />}
        disabled={!status}
        label={'Edit'}
      />
    ),
    [status]
  );

  const renderCheckOutBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        onClick={onOpenModal}
        icon={<ImExit />}
        disabled={!status}
        label={'Check out'}
      />
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

  const renderRow = useCallback(
    (onCloseModal: () => void) => (
      <BookingForm
        booking={booking}
        key={booking.id}
        onCloseModal={onCloseModal}
      />
    ),
    [booking]
  );

  const renderConfirmMessage = useCallback(
    (onCloseModal: () => void) => (
      <ConfirmMessage
        message={`Are you sure to checkout this user? '${booking.users?.name}'`}
        onConfirm={handleClickCheckOutBtn}
        onCloseModal={onCloseModal}
      />
    ),
    [booking.users?.name, handleClickCheckOutBtn]
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
      <div>{status ? 'Check in' : 'Check out'}</div>

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

            <Modal.Window
              name={FORM.EDIT}
              title="Edit Booking"
              renderChildren={renderRow}
            />

            <Modal.Window
              name={FORM.CHECKOUT}
              title="Checkout"
              renderChildren={renderConfirmMessage}
            />
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default BookingRow;
