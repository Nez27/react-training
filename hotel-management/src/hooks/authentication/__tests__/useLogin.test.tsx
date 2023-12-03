import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

// Hooks
import { useLogin } from '../useLogin';

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

describe('useLogin', () => {

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

  test('OnSuccess should call correctly', async () => {
    (useMutation as jest.Mock).mockImplementation(({ onSuccess }) => {
      const result = { mutate: jest.fn(), isPending: false };
      onSuccess({ user: 'tempUser' });

      return result;
    });

    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    renderHook(() => useLogin(), { wrapper: env });

    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('OnError should call correctly', async () => {
    (useMutation as jest.Mock).mockImplementation(({ onError }) => {
      const result = { mutate: jest.fn(), isPending: false };
      onError(new Error('This is error'));

      return result;
    });
    
    renderHook(() => useLogin(), { wrapper: env });

    expect(useMutation).toHaveBeenCalled();
  });
});
