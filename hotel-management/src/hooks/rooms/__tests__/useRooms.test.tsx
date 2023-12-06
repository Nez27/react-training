import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { URLSearchParams } from 'url';

// Services
import { getAllRooms } from '@src/services/roomServices';

// Hooks
import { useRooms } from '../useRooms';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@src/services/roomServices', () => ({
  getAllRooms: jest.fn(),
}));

describe('useRooms hook', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();

    (queryClient.prefetchQuery as jest.Mock) = jest.fn();
  });

  test('Should fetch data successful', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Room 1' }], count: 3 };

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

    (getAllRooms as jest.Mock).mockResolvedValue(sampleDate);

    const { result } = renderHook(() => useRooms(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(result.current.rooms).toEqual(sampleDate.data);
    expect(result.current.count).toEqual(sampleDate.count);
  });

  test('Should prefetch the second page when in the first page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Room 1' }], count: 11 };

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

    (getAllRooms as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useRooms(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(1);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['rooms', 'id', 'asc', '', 2],
      queryFn: expect.any(Function),
    });
  });

  test('Should prefetch the previous page and next page when in the second page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Room 1' }], count: 22 };

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

    (getAllRooms as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useRooms(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(2);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['rooms', 'id', 'asc', '', 3],
      queryFn: expect.any(Function),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['rooms', 'id', 'asc', '', 1],
      queryFn: expect.any(Function),
    });
  });
});
