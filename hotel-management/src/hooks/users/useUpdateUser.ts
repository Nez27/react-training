import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { updateUser as updateUserFn } from '@service/userServices';

// Constants
import { UPDATE_SUCCESS } from '@constant/messages';

// Hooks
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

/**
 * Update user from database
 * @returns The status of updating user and updateUser function
 */
const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    isSuccess,
  } = useMutation({
    mutationFn: updateUserFn,
    onSuccess: (user) => {
      toast.success(UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['users'] });

      // Update name in global state
      dispatch!({
        type: 'updateUserName',
        payload: [{ id: user.id, name: user.name }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser, isSuccess };
};

export { useUpdateUser };
