import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { createBooking as createBookingFn } from '@service/bookingServices';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

// Hooks
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

/**
 * Create booking on database
 * @returns The boolean of isCreating and create booking function
 */
const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    mutate: createBooking,
    isPending: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createBookingFn,
    onSuccess: (data) => {
      toast.success(ADD_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });

      // Update room, user available
      dispatch!({
        type: 'updateStatusUser',
        payload: [{ id: data.userId, status: true }],
      });
      dispatch!({
        type: 'updateStatusRoom',
        payload: [{ id: data.roomId, status: true }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking, isSuccess };
};

export { useCreateBooking };
