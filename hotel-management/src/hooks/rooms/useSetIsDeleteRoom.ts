import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { setIsDeleteRoom as setIsDeleteRoomFn } from '@src/services/roomServices';

// Constants
import { DELETE_SUCCESS } from '@src/constants/messages';

// Hooks
import { useUserRoomAvailable } from '../useUserRoomAvailable';

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
      toast.success(DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['rooms'],
      });

      dispatch?.({ type: 'removeRoom', payload: [{ id: room.id }] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    setIsDeleteRoom,
    isSuccess
  };
};

export { useSetIsDeleteRoom };
