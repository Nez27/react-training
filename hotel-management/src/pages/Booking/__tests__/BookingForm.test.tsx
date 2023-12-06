import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

// Types
import { TBookingResponse } from '@src/types/booking';

// Components
import BookingForm from '../BookingForm';

// Hooks
import { useUserRoomAvailable } from '@src/hooks/useUserRoomAvailable';

const mockUpdateBooking = jest.fn();

jest.mock('@src/hooks/bookings/useUpdateBooking', () => ({
  ...jest.requireActual('@src/hooks/bookings/useUpdateBooking'),
  useUpdateBooking: jest.fn(() => ({
    isUpdating: false,
    updateBooking: mockUpdateBooking,
  })),
}));

jest.mock('@src/hooks/useUserRoomAvailable.ts');

const mockUseUserRoomAvailable = useUserRoomAvailable as jest.MockedFunction<
  typeof useUserRoomAvailable
>;

mockUseUserRoomAvailable.mockReturnValue({
  roomsAvailable: [
    { id: 1, name: 'Room 1', status: false },
    { id: 2, name: 'Room 2', status: false },
  ],
  usersAvailable: [
    { id: 1, name: 'User 1', isBooked: false },
    { id: 2, name: 'User 2', isBooked: false },
  ],
  dispatch: jest.fn(),
});

let result: {
  name: string;
  price: number;
};

describe('BookingForm', () => {
  const queryClient = new QueryClient();

  let wrapper: RenderResult | null = null;

  test('Should render correctly', () => {
    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BookingForm />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('Should edit correctly', async () => {
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

    wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BookingForm booking={tempBooking} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const submitBtn = wrapper!.getByText('Save').closest('button');

    mockUpdateBooking.mockImplementationOnce((newBooking, { onSuccess }) => {
      result = newBooking;
      onSuccess();
    });

    fireEvent.submit(submitBtn!);

    await waitFor(() => {
      expect(mockUpdateBooking).toHaveBeenCalled();
      expect(result).toEqual({
        amount: 1200,
        endDate: '2024-11-22',
        id: 1,
        roomId: 1,
        startDate: '2024-11-21',
        userId: 2,
      });
    });
  });
});
