import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// Types
import { IUser } from '@src/types/user';

// Constants
import { UPDATE_SUCCESS } from '@src/constants/messages';

// Services
import { updateUser } from '@src/services/userServices';

// Hooks
import { useUpdateUser } from '../useUpdateUser';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/userServices', () => ({
  updateUser: jest.fn(),
}));
jest.mock('react-hot-toast');

const tempUser: IUser = {
  id: 1,
  name: 'User 1',
  phone: '0324432312',
  isBooked: true,
  isDelete: false,
};

describe('useUpdateUser', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should update user successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (updateUser as jest.Mock).mockResolvedValue({
      data: tempUser,
    });
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.updateUser(tempUser);
    });

    expect(toast.success).toHaveBeenCalledWith(UPDATE_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['users'],
    });
  });

  test('should handle createUser mutation error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (updateUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.updateUser(tempUser);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
