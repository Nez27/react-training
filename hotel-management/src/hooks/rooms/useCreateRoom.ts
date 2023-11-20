import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { createRoom as createRoomFn } from '@service/roomServices';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

/**
 * Create room on database
 * @returns The boolean of isCreating and create room function
 */
const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoom, isPending: isCreating } = useMutation({
    mutationFn: createRoomFn,
    onSuccess: () => {
      toast.success(ADD_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createRoom };
};

export { useCreateRoom };
