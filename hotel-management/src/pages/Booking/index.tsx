// Styled
import Direction from '@src/commons/styles/Direction';
import { StyledBooking, Title } from './styled';
import Button from '@src/commons/styles/Button';

// Components
import Modal from '@src/components/Modal';
import BookingTable from './BookingTable';
import BookingForm from './BookingForm';

// Constants
import { FORM } from '@src/constants/commons';

const Booking = () => {
  return (
    <StyledBooking>
      <Direction type="horizontal">
        <Title>List Booking</Title>

        <div style={{ display: 'flex', gap: '15px' }}>
          <Modal>
            <Modal.Open
              modalName={FORM.BOOKING}
              renderChildren={(onCloseModal) => (
                <Button onClick={onCloseModal}>Add booking</Button>
              )}
            />
            <Modal.Window
              name={FORM.BOOKING}
              title="Add form"
              renderChildren={(onCloseModal) => (
                <BookingForm onCloseModal={onCloseModal} />
              )}
            />
          </Modal>
        </div>
      </Direction>

      <BookingTable />
    </StyledBooking>
  );
};

export default Booking;
