import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// Types
import { IBooking } from '@type/booking';

// Constants
import { UPDATE_SUCCESS } from '@constant/messages';

// Services
import { updateBooking } from '@service/bookingServices';

// Hooks
import { useUpdateBooking } from '../useUpdateBooking';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@service/bookingServices', () => ({
  updateBooking: jest.fn(),
}));
jest.mock('react-hot-toast');

const tempBooking: IBooking = {
  id: 1,
  startDate: '2023/11/12',
  endDate: '2023/12/11',
  amount: 2300,
  roomId: 1,
  status: true,
  userId: 2,
};

describe('useUpdateBooking', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should update booking successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (updateBooking as jest.Mock).mockResolvedValue({
      data: tempBooking,
    });

    const { result } = renderHook(() => useUpdateBooking(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.updateBooking(tempBooking);
    });

    expect(toast.success).toHaveBeenCalledWith(UPDATE_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['bookings'],
    });
  });

  test('should handle createBooking mutation error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (updateBooking as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useUpdateBooking(), {
      wrapper: env,
    });

    await act(async () => {
      result.current.updateBooking(tempBooking);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
