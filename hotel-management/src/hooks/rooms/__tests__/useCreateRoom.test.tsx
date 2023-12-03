import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// Types
import { IRoom } from '@type/room';

// Hooks
import { useCreateRoom } from '../useCreateRoom';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

// Services
import { createRoom } from '@service/roomServices';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@service/roomServices', () => ({
  createRoom: jest.fn(),
}));
jest.mock('react-hot-toast');

const tempRoom: IRoom = {
  id: 1,
  name: 'Room 1',
  price: 250,
  status: true,
  isDelete: false,
};

describe('useCreateRoom', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should create room successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createRoom as jest.Mock).mockResolvedValue({
      data: tempRoom,
    });

    const { result } = renderHook(() => useCreateRoom(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.createRoom(tempRoom);
    });

    expect(toast.success).toHaveBeenCalledWith(ADD_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['rooms'],
    });
  });

  test('Should have error toast when have an error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createRoom as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCreateRoom(), {
      wrapper: env,
    });

    await act(async () => {
      result.current.createRoom(tempRoom);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
