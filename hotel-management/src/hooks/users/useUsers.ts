import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Services
import { getAllUsers } from '@src/services/userServices';

// Constants
import { DEFAULT_PAGE_SIZE } from '@src/constants/config';

/**
 * Fetch data of users from database
 * @returns The status of loading users and data of users
 */
const useUsers = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const sortByValue = searchParams.get('sortBy') || 'id';
  const orderByValue = searchParams.get('orderBy') || 'asc';
  const searchValue = searchParams.get('search') || '';
  const page = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;

  const {
    isLoading,
    data: { data: users, count } = {},
    error,
  } = useQuery({
    queryKey: ['users', sortByValue, orderByValue, searchValue, page],
    queryFn: () =>
      getAllUsers({
        sortBy: sortByValue,
        orderBy: orderByValue,
        phoneSearch: searchValue,
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
      queryKey: ['users', sortByValue, orderByValue, searchValue, nextPage],
      queryFn: () =>
        getAllUsers({
          sortBy: sortByValue,
          orderBy: orderByValue,
          phoneSearch: searchValue,
          page: nextPage,
        }),
    });
  }

  if (page > 1) {
    const previousPage = page - 1;

    queryClient.prefetchQuery({
      queryKey: ['users', sortByValue, orderByValue, searchValue, previousPage],
      queryFn: () =>
        getAllUsers({
          sortBy: sortByValue,
          orderBy: orderByValue,
          phoneSearch: searchValue,
          page: previousPage,
        }),
    });
  }

  return {
    isLoading,
    users,
    count,
  };
};

export { useUsers };
