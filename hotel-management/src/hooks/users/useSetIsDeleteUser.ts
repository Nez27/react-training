import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { setIsDeleteUser as setIsDeleteUserFn } from '@src/services/userServices';

// Constants
import { DELETE_SUCCESS } from '@src/constants/messages';

// Hooks
import { useUserRoomAvailable } from '../useUserRoomAvailable';

/**
 * Delete the user from database
 * @returns The boolean of status deleting and deleteUser function
 */
const useIsDeleteUser = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    isPending: isDeleting,
    mutate: setIsDeleteUser,
    isSuccess,
  } = useMutation({
    mutationFn: setIsDeleteUserFn,
    onSuccess: (user) => {
      toast.success(DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });

      // Remove user from global state
      dispatch?.({ type: 'removeUser', payload: [{ id: user.id }] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    setIsDeleteUser,
    isSuccess,
  };
};

export { useIsDeleteUser };
