import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { updateUser as updateUserFn } from '@service/userServices';

// Messages
import { UPDATE_SUCCESS } from '@constant/messages';

/**
 * Update user from database
 * @returns The status of updating user and updateUser function
 */
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserFn,
    onSuccess: () => {
      toast.success(UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
};

export { useUpdateUser };
