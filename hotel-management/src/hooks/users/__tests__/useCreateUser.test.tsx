import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// Hooks
import { useCreateUser } from '../useCreateUser';

// Types
import { IUser } from '@type/user';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

// Services
import { createUser } from '@service/userServices';

// Mock the necessary dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));
jest.mock('@service/userServices', () => ({
  createUser: jest.fn(),
}));
jest.mock('react-hot-toast');

const tempUser: IUser = {
  id: 1,
  name: 'User 1',
  phone: '0324432312',
  isBooked: true,
  isDelete: false,
};

describe('useCreateUser', () => {
  const queryClient = new QueryClient();
  const env = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test('Should create user successful', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createUser as jest.Mock).mockResolvedValue({
      data: tempUser,
    });

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: env,
    });

    // Call function
    await act(async () => {
      result.current.createUser(tempUser);
    });

    expect(toast.success).toHaveBeenCalledWith(ADD_SUCCESS);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['users'],
    });
  });

  test('Should have error toast when have an error', async () => {
    const errorMessage = 'Error';

    (toast.error as jest.Mock).mockImplementation(() => {});

    const invalidateQueriesMock = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValueOnce({
      invalidateQueries: invalidateQueriesMock,
    });
    (createUser as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: env,
    });

    await act(async () => {
      result.current.createUser(tempUser);
    });

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
