import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { setIsDeleteUser as setIsDeleteUserFn } from '@service/userServices';

// Constants
import * as messages from '@constant/messages';
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

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
      toast.success(messages.DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });

      // Remove user from global state
      dispatch?.({ type: 'removeUser', payload: [{ id: user.id }] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, setIsDeleteUser, isSuccess };
};

export { useIsDeleteUser };
