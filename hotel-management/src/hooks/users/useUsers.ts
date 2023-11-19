import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

// Services
import { getAllUsers } from "@service/userServices";

/**
 * Fetch data of users from database
 * @returns The status of loading users and data of users
 */
const useUsers = () => {
  const [searchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy') || 'id';
  const orderByValue = searchParams.get('orderBy') || 'asc';
  const phoneSearch = searchParams.get('search') || ''

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users', sortByValue, orderByValue, phoneSearch],
    queryFn: () => getAllUsers(sortByValue, orderByValue, phoneSearch),
  });

  if (error) {
    toast.error(error.message);
  }

  return { isLoading, users };
};

export { useUsers };
