import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { setIsDeleteRoom as setIsDeleteRoomFn } from '@service/roomServices';

// Constants
import * as messages from '@constant/messages';
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

/**
 * Delete the room from database
 * @returns The boolean of status deleting and deleteRoom function
 */
const useSetIsDeleteRoom = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    isPending: isDeleting,
    mutate: setIsDeleteRoom,
    isSuccess,
  } = useMutation({
    mutationFn: setIsDeleteRoomFn,
    onSuccess: (room) => {
      toast.success(messages.DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['rooms'],
      });

      dispatch?.({ type: 'removeRoom', payload: [{ id: room.id }] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, setIsDeleteRoom, isSuccess };
};

export { useSetIsDeleteRoom };
