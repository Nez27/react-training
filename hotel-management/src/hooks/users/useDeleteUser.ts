import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { deleteUser as deleteUserFn } from '@service/userServices';

// Constants
import * as messages from '@constant/messages';

/**
 * Delete the user from database
 * @returns The boolean of status deleting and deleteUser function
 */
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteUser,
    isSuccess
  } = useMutation({
    mutationFn: deleteUserFn,
    onSuccess: () => {
      toast.success(messages.DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser, isSuccess };
};

export { useDeleteUser };
