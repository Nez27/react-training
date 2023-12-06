import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// Types
import { IRoom } from '@src/types/room';

// Constants
import { DELETE_SUCCESS } from '@src/constants/messages';

// Services
import { setIsDeleteRoom } from '@src/services/roomServices';

// Hooks
import { useSetIsDeleteRoom } from '../useSetIsDeleteRoom';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/roomServices', () => ({
  setIsDeleteRoom: jest.fn(),
}));
jest.mock('react-hot-toast');

const tempRoom: IRoom = {
  id: 1,
  name: 'Room 1',
  price: 250,
  status: true,
  isDelete: false,
};

describe('useUpdateRoom', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should update room successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (setIsDeleteRoom as jest.Mock).mockResolvedValue({
      data: tempRoom,
    });

    const { result } = renderHook(() => useSetIsDeleteRoom(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.setIsDeleteRoom(1);
    });

    expect(toast.success).toHaveBeenCalledWith(DELETE_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['rooms'],
    });
  });

  test('should handle createRoom mutation error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});
    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (setIsDeleteRoom as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useSetIsDeleteRoom(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.setIsDeleteRoom(1);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
