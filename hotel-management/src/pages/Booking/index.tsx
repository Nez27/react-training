// Styled
import Direction from '@commonStyle/Direction';
import { StyledBooking, Title } from './styled';
import Button from '@commonStyle/Button';

// Components
import Modal from '@component/Modal';
import BookingTable from './BookingTable';
import BookingForm from './BookingForm';

// Constants
import { FORM } from '@constant/commons';

const Booking = () => {
  return (
    <StyledBooking>
      <Direction type="horizontal">
        <Title>List Booking</Title>

        <Modal>
          <Modal.Open
            modalName={FORM.BOOKING}
            renderChildren={(onCloseModal) => (
              <Button onClick={onCloseModal}>Add booking</Button>
            )}
          />
          <Modal.Window name={FORM.BOOKING} title="Add form">
            <BookingForm />
          </Modal.Window>
        </Modal>
      </Direction>

      <BookingTable />
    </StyledBooking>
  );
};

export default Booking;
