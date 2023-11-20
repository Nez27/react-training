import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { updateRoom as updateRoomFn } from '@service/roomServices';

// Constants
import { UPDATE_SUCCESS } from '@constant/messages';

/**
 * Update room from database
 * @returns The status of updating and updateRoom function
 */
const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  const { mutate: updateRoom, isPending: isUpdating } = useMutation({
    mutationFn: updateRoomFn,
    onSuccess: () => {
      toast.success(UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateRoom };
};

export { useUpdateRoom };
