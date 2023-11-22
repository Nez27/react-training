import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Services
import { getAllRooms } from '@service/roomServices';

/**
 * Fetch room from database
 * @returns The status of loading rooms from database and data of rooms
 */
const useRooms = () => {
  const [searchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy') || 'id';
  const orderByValue = searchParams.get('orderBy') || 'asc';
  const phoneSearch = searchParams.get('search') || '';

  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ['rooms', sortByValue, orderByValue, phoneSearch],
    queryFn: () => getAllRooms(sortByValue, orderByValue, phoneSearch),
  });

  if (error) {
    toast.error(error.message);
  }

  return { isLoading, rooms };
};

export { useRooms };
