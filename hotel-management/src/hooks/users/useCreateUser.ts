import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { createUser as createUserFn } from '@service/userServices';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

// Hooks
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

/**
 * Create user in database
 * @returns The status of creating users and createUser function
 */
const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: createUserFn,
    onSuccess: (user) => {
      toast.success(ADD_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['users'] });

      // Add user to global statement
      dispatch!({
        type: 'addUser',
        payload: [{ id: user.id, name: user.name }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createUser };
};

export { useCreateUser };
