import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';

// Hooks
import { useCreateBooking } from '../useCreateBooking';

// Types
import { IBooking } from '@src/types/booking';

// Constants
import { ADD_SUCCESS } from '@src/constants/messages';

// Services
import { createBooking } from '@src/services/bookingServices';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/bookingServices', () => ({
  createBooking: jest.fn(),
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

describe('useCreateBooking', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should create booking successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createBooking as jest.Mock).mockResolvedValue({
      data: tempBooking,
    });

    const { result } = renderHook(() => useCreateBooking(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.createBooking(tempBooking);
    });

    expect(toast.success).toHaveBeenCalledWith(ADD_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['bookings'],
    });
  });

  test('Should have error toast when have an error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});
    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createBooking as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCreateBooking(), {
      wrapper: env,
    });

    await act(async () => {
      result.current.createBooking(tempBooking);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
