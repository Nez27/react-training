import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Services
import { getAllRooms } from '@service/roomServices';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';

/**
 * Fetch room from database
 * @returns The status of loading rooms from database and data of rooms
 */
const useRooms = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByValue = searchParams.get('sortBy') || 'id';
  const orderByValue = searchParams.get('orderBy') || 'asc';
  const searchValue = searchParams.get('search') || '';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const {
    isLoading,
    data: { data: rooms, count } = {},
    error,
  } = useQuery({
    queryKey: ['rooms', sortByValue, orderByValue, searchValue, page],
    queryFn: () =>
      getAllRooms({
        sortBy: sortByValue,
        orderBy: orderByValue,
        roomSearch: searchValue,
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
      queryKey: ['rooms', sortByValue, orderByValue, searchValue, nextPage],
      queryFn: () =>
        getAllRooms({
          sortBy: sortByValue,
          orderBy: orderByValue,
          roomSearch: searchValue,
          page: nextPage,
        }),
    });
  }

  if (page > 1) {
    const previousPage = page - 1;

    queryClient.prefetchQuery({
      queryKey: ['rooms', sortByValue, orderByValue, searchValue, previousPage],
      queryFn: () =>
        getAllRooms({
          sortBy: sortByValue,
          orderBy: orderByValue,
          roomSearch: searchValue,
          page: previousPage,
        }),
    });
  }

  return {
    isLoading,
    rooms,
    count
  };
};

export { useRooms };
