import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

// Hooks
import { useCreateUser } from '@hook/users/useCreateUser';
import { useUpdateUser } from '@hook/users/useUpdateUser';
import { useUsers } from '@hook/users/useUsers';

// Types
import { IUser } from '@type/user';

jest.mock('@hook/users/useUsers');
jest.mock('@hook/users/useCreateUser');
jest.mock('@hook/users/useUpdateUser');

interface IWrapper {
  children: ReactNode;
}

const sampleData: IUser = {
  id: 999,
  name: 'User name test',
  phone: '123456789',
  isBooked: true,
  isDelete: true,
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: IWrapper) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Users hook', () => {
  test('Should fetch user data correctly', async () => {
    (useUsers as jest.Mock).mockImplementation(() => ({
      users: [
        {
          id: 1,
          name: 'Nezumi',
          phone: '0123456678',
          isBooked: true,
          isDelete: true,
        },
        {
          id: 2,
          name: 'Loi Phan',
          phone: '0123456678',
          isBooked: false,
          isDelete: true,
        },
      ],
      isLoading: false,
      count: 2,
    }));
    const { result } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => expect(result.current.users?.length).toEqual(2));
  });

  test('Should create user correctly', async () => {
    (useCreateUser as jest.Mock).mockImplementation(() => ({
      createUser: () => {
        sampleData;
      },
      isCreating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => useCreateUser(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.createUser(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });

  test('Should update user correctly', async () => {
    (useUpdateUser as jest.Mock).mockImplementation(() => ({
      updateUser: () => {
        sampleData;
      },
      isUpdating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.updateUser(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });
});
