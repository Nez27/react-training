import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

// Hooks
import { useUpdateAccount } from '../useUpdateAccount';

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

describe('useUpdateAccount', () => {

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
      const action = { mutate: jest.fn(), isUpdating: false };
      onSuccess({ user: 'tempUser' });

      return action;
    });

    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    renderHook(() => useUpdateAccount(), { wrapper: env });
  });

  test('OnError should call correctly', async () => {
    (useMutation as jest.Mock).mockImplementation(({ onError }) => {
      const action = { mutate: jest.fn(), isUpdating: false };
      onError(new Error('This is error'));

      return action;
    });
    
    renderHook(() => useUpdateAccount(), { wrapper: env });
  });
});
