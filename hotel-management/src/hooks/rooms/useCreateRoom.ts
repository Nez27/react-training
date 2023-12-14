import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { createRoom as createRoomFn} from '@src/services/roomServices';

// Constants
import { ADD_SUCCESS } from '@src/constants/messages';

// Hooks
import { useUserRoomAvailable } from '../useUserRoomAvailable';

/**
 * Create room on database
 * @returns The boolean of isCreating and create room function
 */
const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    mutate: createRoom,
    isPending: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createRoomFn,
    onSuccess: (room) => {
      toast.success(ADD_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['rooms'] });

      // Add room available to global state
      dispatch!({
        type: 'addRoom',
        payload: [{ id: room.id, name: room.name }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createRoom,
    isSuccess
  };
};

export { useCreateRoom };
