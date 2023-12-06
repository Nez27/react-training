import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Types
import { TBookingResponse } from '@src/types/booking';

// Components
import BookingRow from '../BookingRow';

describe('BookingRow', () => {
  const tempBooking: TBookingResponse = {
    id: 1,
    startDate: '2024-11-21',
    endDate: '2024-11-22',
    amount: 1200,
    status: true,
    rooms: {
      id: 1,
      name: 'Room 1',
    },
    users: {
      id: 2,
      name: 'Room 2',
    },
  };

  const queryClient = new QueryClient();
  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BookingRow booking={tempBooking} />
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
