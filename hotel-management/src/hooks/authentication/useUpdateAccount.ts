import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Services
import { updateAccount as updateAccountFn } from '@src/services/authenticationService';

// Constants
import { UPDATE_ACCOUNT_SUCCESSFUL } from '@src/constants/messages';

/**
 * Update account currently login.
 * @returns Return updateAccount function and isUpdating boolean
 */
const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  const { mutate: updateAccount, isPending: isUpdating } = useMutation({
    mutationFn: updateAccountFn,
    onSuccess: (account) => {
      toast.success(UPDATE_ACCOUNT_SUCCESSFUL);
      queryClient.setQueryData(['account'], account.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateAccount, isUpdating };
};

export { useUpdateAccount };
