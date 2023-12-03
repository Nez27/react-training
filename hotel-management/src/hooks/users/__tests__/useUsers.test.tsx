import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { URLSearchParams } from 'url';

// Services
import { getAllUsers } from '@service/userServices';

// Hooks
import { useUsers } from '../useUsers';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@service/userServices', () => ({
  getAllUsers: jest.fn(),
}));

describe('useUsers hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient();
    (queryClient.prefetchQuery as jest.Mock) = jest.fn();
  });

  test('Should fetch data successful', async () => {
    const sampleDate = { data: [{ id: 1, name: 'User 1' }], count: 3 };

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('page=1'),
      new URLSearchParams('search=test'),
    ]);

    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      const result = {
        isLoading: false,
        error: {},
        data: sampleDate,
      };
      queryFn();

      return result;
    });

    (getAllUsers as jest.Mock).mockResolvedValue(sampleDate);

    const { result } = renderHook(() => useUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(result.current.users).toEqual(sampleDate.data);
    expect(result.current.count).toEqual(sampleDate.count);
  });

  test('Should prefetch the second page when in the first page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'User 1' }], count: 7 };

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('page=1'),
      new URLSearchParams('search=test'),
    ]);

    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      const result = {
        isLoading: false,
        error: {},
        data: sampleDate,
      };
      queryFn();

      return result;
    });

    (getAllUsers as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(1);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['users', 'id', 'asc', '', 2],
      queryFn: expect.any(Function),
    });
  });

  test('Should prefetch the previous page and next page when in the second page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'User 1' }], count: 12 };

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('page=2'),
      new URLSearchParams('search=test'),
    ]);

    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
      const result = {
        isLoading: false,
        error: {},
        data: sampleDate,
      };
      queryFn();

      return result;
    });

    (getAllUsers as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useUsers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(2);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['users', 'id', 'asc', '', 3],
      queryFn: expect.any(Function),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['users', 'id', 'asc', '', 1],
      queryFn: expect.any(Function),
    });
  });
});
