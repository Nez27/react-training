import Direction from '@commonStyle/Direction';
import styled from 'styled-components';
import { Title } from './styled';
import Modal from '@component/Modal';
import Button from '@commonStyle/Button';
import BookingTable from './BookingTable';
import BookingForm from './BookingForm';

// Constants
const bookingForm = 'booking-form';

const StyledBooking = styled.main`
  padding: 20px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Booking = () => {

  return (
    <StyledBooking>
      <Direction type="horizontal">
        <Title>List Booking</Title>

        <Modal>
          <Modal.Open
            modalName={bookingForm}
            renderChildren={(onCloseModal) => (
              <Button onClick={onCloseModal}>Add booking</Button>
            )}
          />
          <Modal.Window name={bookingForm} title="Add form">
            <BookingForm />
          </Modal.Window>
        </Modal>
      </Direction>

      <BookingTable />
    </StyledBooking>
  );
};

export default Booking;
