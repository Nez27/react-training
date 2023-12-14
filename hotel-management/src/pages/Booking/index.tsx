// Components
import BookingForm from './BookingForm';
import Modal from '@src/components/Modal';
import ButtonIcon from '@src/components/ButtonIcon';
import Direction from '@src/commons/styles/Direction';
import {FiEdit} from 'react-icons/fi';
import {MdOutlineAddCircleOutline} from 'react-icons/md';
import Table from '@src/components/Table';

// Styled
import {ActionTable, StyledBooking, Title} from './styled';
import Spinner from '@src/commons/styles/Spinner.ts';

// Types
import {ColumnProps} from '@src/types/common.ts';
import {TBookingResponse} from '@src/types/booking.ts';

// Hooks
import {useBookings} from '@src/hooks/bookings/useBookings.ts';
import {useEffect, useState} from 'react';
import {FORM} from '@src/constants/commons.ts';
import {findItemInListById, formatCurrency} from '@src/helpers/helper.ts';
import ConfirmMessage from '@src/components/ConfirmMessage';
import useCheckOut from '@src/hooks/bookings/useCheckout.ts';
import toast from 'react-hot-toast';
import {ImExit} from "react-icons/im";
import Message from "@src/components/Message";

interface IBookingTable extends Omit<TBookingResponse, 'status' | 'amount'> {
  amount: string;
  status: string;
}

const Booking = () => {
  const {checkOutBooking} = useCheckOut();
  const [itemSelected, setItemSelected] = useState<IBookingTable>();
  let bookingSelected: TBookingResponse | undefined;

  const columns: ColumnProps[] = [
    {
      key: 'user',
      title: 'User',
      width: 10
    },
    {
      key: 'date',
      title: 'Date',
      width: 25,
      isDateValue: true
    },
    {
      key: 'room',
      title: 'Room',
      width: 20
    },
    {
      key: 'amount',
      title: 'Amount',
      width: 15
    },
    {
      key: 'status',
      title: 'Status',
      width: 20
    }
  ];
  const {isLoading, bookings, count} = useBookings();

  // Reset value when bookings changed.
  useEffect(() => {
    setItemSelected(undefined);
  }, [bookings]);

  const tempBookings = bookings?.map((booking) => (
    {
      ...booking,
      date: [booking.startDate, booking.endDate],
      amount: formatCurrency(booking.amount),
      room: booking.rooms!.name,
      user: booking.users!.name,
      status: booking.status
        ? 'Check in'
        : 'Check out',
    }
  ));

  if (itemSelected && bookings) {
    bookingSelected = findItemInListById<TBookingResponse>(itemSelected.id, bookings);
  }

  const handleClickCheckOutBtn = () => {
    if (itemSelected && itemSelected.status) {
      checkOutBooking({
        idBooking: itemSelected.id,
        roomId: itemSelected!.rooms!.id,
        userId: itemSelected!.users!.id
      });
    } else {
      toast.error('User already checkout!');
    }
  };

  return (
    <StyledBooking>
      <Direction type="horizontal">
        <Title>List Booking</Title>

        <Modal>
          <ActionTable>
            <Modal.Open
              modalName={FORM.ROOM}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<MdOutlineAddCircleOutline/>}
                  text={'Add Booking'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'primary'}
                  iconColor={'white'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.EDIT}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<FiEdit/>}
                  text={'Edit'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'success'}
                  iconColor={'white'}
                  disabled={!itemSelected || itemSelected?.status === 'Check out'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.CHECKOUT}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<ImExit />}
                  text={'Check out'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'danger'}
                  iconColor={'white'}
                  disabled={!itemSelected || itemSelected?.status === 'Check out'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Window
              name={FORM.ROOM}
              title="Add form"
              renderChildren={(onCloseModal) => (
                <BookingForm onCloseModal={onCloseModal}/>
              )}
            />

            <Modal.Window
              name={FORM.EDIT}
              title="Edit Booking"
              renderChildren={(onCloseModal) =>
                <BookingForm booking={bookingSelected} onCloseModal={onCloseModal}/>
              }/>

            <Modal.Window
              name={FORM.CHECKOUT}
              title="Check Out"
              renderChildren={(onCloseModal) =>
                <ConfirmMessage
                  message={`Are you sure to check out this user? "${bookingSelected!.users!.name}"?`}
                  onConfirm={handleClickCheckOutBtn}
                  onCloseModal={onCloseModal}
                />
              }/>

          </ActionTable>
        </Modal>
      </Direction>

      {isLoading && <Spinner/>}

      {
        tempBookings &&
        Boolean(tempBookings.length) &&
        <Table<IBookingTable>
          columns={columns}
          rows={tempBookings}
          count={count}
          searchPlaceHolder={'Search by name...'}
          stateSelected={{
            itemSelected,
            setItemSelected
          }}
          onRowClick={(data) => {
            setItemSelected(data);
          }}/>
      }

      {tempBookings && Boolean(!tempBookings.length) && <Message>No data to show here!</Message>}
    </StyledBooking>
  );
};

export default Booking;
