import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Services
import { getAllBookings } from '@service/bookingServices';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';

/**
 * Fetch booking from database
 * @returns The status of loading bookings from database and data of bookings
 */
const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByValue = searchParams.get('sortBy') || 'id';
  const orderByValue = searchParams.get('orderBy') || 'asc';
  const userNameSearch = searchParams.get('search') || '';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', sortByValue, orderByValue, userNameSearch, page],
    queryFn: () =>
      getAllBookings(sortByValue, orderByValue, userNameSearch, page),
  });

  if (error) {
    toast.error(error.message);
  }

  // Pre-fetching
  const totalPage = Math.ceil(count! / DEFAULT_PAGE_SIZE);

  if (page < totalPage) {
    const nextPage = page + 1;

    queryClient.prefetchQuery({
      queryKey: ['bookings', sortByValue, orderByValue, userNameSearch, nextPage],
      queryFn: () =>
        getAllBookings(sortByValue, orderByValue, userNameSearch, nextPage),
    });
  }

  if (page > 1) {
    const previousPage = page - 1;

    queryClient.prefetchQuery({
      queryKey: [
        'bookings',
        sortByValue,
        orderByValue,
        userNameSearch,
        previousPage,
      ],
      queryFn: () =>
        getAllBookings(sortByValue, orderByValue, userNameSearch, previousPage),
    });
  }

  return { isLoading, bookings, count };
};

export { useBookings };
