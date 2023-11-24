import { useCreateUser } from '@hook/users/useCreateUser';
import { useUpdateUser } from '@hook/users/useUpdateUser';
import { useUsers } from '@hook/users/useUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { IUser } from '@type/users';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';

const mockUseUsers = jest.fn(useUsers);
const mockUseCreateUser = jest.fn(useCreateUser);
const mockUseUpdateUser = jest.fn(useUpdateUser);

interface IWrapper {
  children: ReactNode;
}

const sampleData: IUser = {
  id: 999,
  name: 'User name test',
  phone: '123456789',
  isBooked: true,
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

describe('CRUD User testing', () => {
  test('Fetch user data', async () => {
    mockUseUsers.mockImplementation(() => ({
      users: [
        {
          id: 1,
          name: 'Nezumi',
          phone: '0123456678',
          isBooked: true,
        },
        {
          id: 2,
          name: 'Loi Phan',
          phone: '0123456678',
          isBooked: false,
        },
      ],
      isLoading: false,
    }))
    const { result } = renderHook(() => mockUseUsers(), { wrapper });

    await waitFor(() =>
      expect(result.current.users?.length).toEqual(2)
    );
  });

  test('Create user', async () => {
    mockUseCreateUser.mockImplementation(() => ({
      createUser: () => {sampleData},
      isCreating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => mockUseCreateUser(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.createUser(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });

  test('Update user', async () => {
    mockUseUpdateUser.mockImplementation(() => ({
      updateUser: () => {sampleData},
      isUpdating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => mockUseUpdateUser(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.updateUser(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });
});
