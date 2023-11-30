import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Services
import { updateAccount as updateAccountFn } from '@service/authenticationService';

// Constants
import { UPDATE_ACCOUNT_SUCCESSFUL } from '@constant/messages';

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
