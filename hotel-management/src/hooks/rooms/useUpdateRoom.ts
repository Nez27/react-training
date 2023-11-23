import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { updateRoom as updateRoomFn } from '@service/roomServices';

// Constants
import { UPDATE_SUCCESS } from '@constant/messages';
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

/**
 * Update room from database
 * @returns The status of updating and updateRoom function
 */
const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    mutate: updateRoom,
    isPending: isUpdating,
    isSuccess
  } = useMutation({
    mutationFn: updateRoomFn,
    onSuccess: (room) => {
      toast.success(UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['rooms'] });

      // Update name room in global state
      dispatch?.({
        type: 'updateRoomName',
        payload: [{ id: room.id, name: room.name }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateRoom, isSuccess };
};

export { useUpdateRoom };
