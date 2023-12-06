import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Services
import { getAllBookings } from '@src/services/bookingServices';

// Constants
import { DEFAULT_PAGE_SIZE } from '@src/constants/config';

/**
 * Fetch booking from database
 * @returns The status of loading bookings from database and data of bookings
 */
const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('search') || '';
  const page = searchParams.get('page') 
    ? Number(searchParams.get('page')) 
    : 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', searchValue, page],
    queryFn: () =>
      getAllBookings({
        userNameSearch: searchValue,
        page,
      }),
  });

  if (error) {
    toast.error(error.message);
  }

  // Pre-fetching
  const totalPage = Math.ceil(count! / DEFAULT_PAGE_SIZE);

  if (page < totalPage) {
    const nextPage = page + 1;

    queryClient.prefetchQuery({
      queryKey: ['bookings', searchValue, nextPage],
      queryFn: () =>
        getAllBookings({
          userNameSearch: searchValue,
          page: nextPage,
        }),
    });
  }

  if (page > 1) {
    const previousPage = page - 1;

    queryClient.prefetchQuery({
      queryKey: ['bookings', searchValue, previousPage],
      queryFn: () =>
        getAllBookings({
          userNameSearch: searchValue,
          page: previousPage,
        }),
    });
  }

  return {
    isLoading,
    bookings,
    count
  };
};

export { useBookings };
