import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { deleteRoom as deleteRoomFn } from '@service/roomServices';

// Constants
import * as messages from '@constant/messages';

/**
 * Delete the room from database
 * @returns The boolean of status deleting and deleteRoom function
 */
const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteRoom,
    isSuccess,
  } = useMutation({
    mutationFn: deleteRoomFn,
    onSuccess: () => {
      toast.success(messages.DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['rooms'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRoom, isSuccess };
};

export { useDeleteRoom };
