import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useCheckOut from '../useCheckout';
import { act, renderHook } from '@testing-library/react';

// Services
import { checkOutBooking } from '@src/services/bookingServices';

// Hooks
import { useUserRoomAvailable } from '@src/hooks/useUserRoomAvailable';

// Constants
import { CHECKOUT_SUCCESS } from '@src/constants/messages';

// Mock services and constants
jest.mock('react-hot-toast');
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/bookingServices', () => ({
  checkOutBooking: jest.fn(),
}));
jest.mock('@src/hooks/useUserRoomAvailable', () => ({
  useUserRoomAvailable: jest.fn(),
}));

const mockData = {
  roomId: '123',
  userId: '456',
};

describe('useCheckOut', () => {
  const queryClient = new QueryClient();

  it('Should checkout successful', async () => {
    const queryClientMock = { invalidateQueries: jest.fn() };
    (useQueryClient as jest.Mock).mockReturnValue(queryClientMock);
    (toast.success as jest.Mock).mockImplementation(() => {});

    const dispatchMock = jest.fn();

    (useUserRoomAvailable as jest.Mock).mockReturnValue({
      dispatch: dispatchMock,
    });

    const { result } = renderHook(() => useCheckOut(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    (checkOutBooking as jest.Mock).mockResolvedValue(mockData);

    await act(async () => {
      result.current.checkOutBooking({ idBooking: 1, roomId: 1, userId: 1 });
    });

    // Verify that necessary functions were called
    expect(toast.success).toHaveBeenCalledWith(CHECKOUT_SUCCESS);

    expect(queryClientMock.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['bookings'],
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'updateStatusRoom',
      payload: [{ id: mockData.roomId, status: false }],
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'updateStatusUser',
      payload: [{ id: mockData.userId, isBooked: false }],
    });
  });

  it('Should show error when checkout failed', async () => {
    const errorMessage = 'Checkout failed';

    (toast.error as jest.Mock).mockImplementation(() => {});
    (checkOutBooking as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCheckOut(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      result.current.checkOutBooking({ idBooking: 1, roomId: 1, userId: 1 });
    });

    // Verify that error toast is displayed
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
