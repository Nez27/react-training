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
import { DELETE_SUCCESS } from '@src/constants/messages';

// Services
import { setIsDeleteUser } from '@src/services/userServices';

// Hooks
import { useIsDeleteUser } from '../useSetIsDeleteUser';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/services/userServices', () => ({
  setIsDeleteUser: jest.fn(),
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
    (setIsDeleteUser as jest.Mock).mockResolvedValue({
      data: tempUser,
    });

    const { result } = renderHook(() => useIsDeleteUser(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.setIsDeleteUser(1);
    });

    expect(toast.success).toHaveBeenCalledWith(DELETE_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['users'],
    });
  });

  test('Should throw error when set failed', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});
    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (setIsDeleteUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useIsDeleteUser(), {
      wrapper: env,
    });

    await act(async () => {
      result.current.setIsDeleteUser(1);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
