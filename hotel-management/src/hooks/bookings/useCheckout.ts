import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Constants
import { CHECKOUT_SUCCESS } from '@constant/messages';

// Hooks
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';

// Services
import { checkOutBooking as checkOutBookingFn } from '@service/bookingServices';

const useCheckOut = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useUserRoomAvailable();

  const {
    mutate: checkOutBooking,
    isPending: isChecking,
    isSuccess,
  } = useMutation({
    mutationFn: checkOutBookingFn,
    onSuccess: (data) => {
      toast.success(CHECKOUT_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });

      // Update status room, users
      dispatch!({
        type: 'updateStatusRoom',
        payload: [{ id: data.roomId, status: false }],
      });
      dispatch!({
        type: 'updateStatusUser',
        payload: [{ id: data.userId, isBooked: false }],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    checkOutBooking,
    isChecking,
    isSuccess
  };
};

export default useCheckOut;
