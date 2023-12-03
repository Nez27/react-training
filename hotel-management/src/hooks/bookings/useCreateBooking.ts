import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Services
import { createBooking as createBookingFn } from '@service/bookingServices';

// Constants
import { ADD_SUCCESS } from '@constant/messages';

/**
 * Create booking on database
 * @returns The boolean of isCreating and create booking function
 */
const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createBooking,
    isPending: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: createBookingFn,
    onSuccess: () => {
      toast.success(ADD_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createBooking,
    isSuccess
  };
};

export { useCreateBooking };
