import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { deleteBooking as deleteBookingFn } from '@service/bookingServices';

// Constants
import { DELETE_SUCCESS } from '@constant/messages';

/**
 * Delete the booking from database
 * @returns The boolean of status deleting and deleteBooking function
 */
const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteBooking,
    isSuccess,
  } = useMutation({
    mutationFn: deleteBookingFn,
    onSuccess: () => {
      toast.success(DELETE_SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking, isSuccess };
};

export { useDeleteBooking };
