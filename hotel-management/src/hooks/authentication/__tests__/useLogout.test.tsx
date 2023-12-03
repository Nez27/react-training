import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Hooks
import { useLogout } from '../useLogout';

interface IWrapper {
  children: ReactNode;
}

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('useLogout', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const env = ({ children }: IWrapper) => {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };

  test('Should logout successful', async () => {
    (useMutation as jest.Mock).mockImplementation(({ onSuccess }) => {
      const result = { mutate: jest.fn(), isPending: false };
      onSuccess(); // Simulate a successful logout

      return result;
    });

    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const { result } = renderHook(() => useLogout(), { wrapper: env });

    // Call the logout function
    await act(async () => {
      result.current.logout();
    });

    // Assert that navigate has been called with the correct arguments
    expect(navigateMock).toHaveBeenCalledWith('/login', { replace: true });
  });
});
