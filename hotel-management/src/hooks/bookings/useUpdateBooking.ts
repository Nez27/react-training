import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { updateBooking as updateBookingFn } from '@service/bookingServices';

// Constants
import { UPDATE_SUCCESS } from '@constant/messages';

/**
 * Update booking from database
 * @returns The status of updating and updateBooking function
 */
const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateBooking,
    isPending: isUpdating,
    isSuccess
  } = useMutation({
    mutationFn: updateBookingFn,
    onSuccess: () => {
      toast.success(UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateBooking, isSuccess };
};

export { useUpdateBooking };
