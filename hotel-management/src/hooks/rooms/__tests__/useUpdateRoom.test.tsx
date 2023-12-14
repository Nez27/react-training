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
import { UPDATE_SUCCESS } from '@src/constants/messages';

// Services
import { updateRoom } from '@src/services/roomServices';

// Hooks
import { useUpdateRoom } from '../useUpdateRoom';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/roomServices', () => ({
  updateRoom: jest.fn(),
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
    (updateRoom as jest.Mock).mockResolvedValue({
      data: tempRoom,
    });

    const { result } = renderHook(() => useUpdateRoom(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.updateRoom(tempRoom);
    });

    expect(toast.success).toHaveBeenCalledWith(UPDATE_SUCCESS);
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
    (updateRoom as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useUpdateRoom(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.updateRoom(tempRoom);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
