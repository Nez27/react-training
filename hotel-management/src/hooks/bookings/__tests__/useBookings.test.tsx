import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { URLSearchParams } from 'url';

// Hooks
import { useBookings } from '../useBookings';

// Services
import { getAllBookings } from '@service/bookingServices';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@service/bookingServices', () => ({
  getAllBookings: jest.fn(),
}));

describe('useBookings hook', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should fetch data successful', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Booking 1' }], count: 3 };

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

    (getAllBookings as jest.Mock).mockResolvedValue(sampleDate);

    const { result } = renderHook(() => useBookings(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(result.current.bookings).toEqual(sampleDate.data);
    expect(result.current.count).toEqual(sampleDate.count);
  });

  test('Should prefetch the second page when in the first page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Booking 1' }], count: 7 };

    (queryClient.prefetchQuery as jest.Mock) = jest.fn();
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

    (getAllBookings as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useBookings(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(1);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['bookings', '', 2],
      queryFn: expect.any(Function),
    });
  });

  test('Should prefetch the previous page and next page when in the second page', async () => {
    const sampleDate = { data: [{ id: 1, name: 'Booking 1' }], count: 12 };

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

    (getAllBookings as jest.Mock).mockResolvedValue(sampleDate);

    renderHook(() => useBookings(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(2);

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['bookings', '', 3],
      queryFn: expect.any(Function),
    });

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['bookings', '', 1],
      queryFn: expect.any(Function),
    });
  });
});
