import { CHECKOUT_SUCCESS } from '@constant/messages';
import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';
import { checkOutBooking as checkOutBookingFn } from '@service/bookingServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      dispatch!({type: 'updateStatusRoom', payload: [{id: data.roomId, status: false}]})
      dispatch!({type: 'updateStatusUser', payload: [{id: data.userId, isBooked: false}]})
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkOutBooking, isChecking, isSuccess };
};

export default useCheckOut;
