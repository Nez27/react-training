import { useMutation } from '@tanstack/react-query';
import { createAccount as createAccountFn } from '@src/services/authenticationService.ts';
import toast from 'react-hot-toast';

const useSignUpAccount = () => {
  const { mutate: createAccount, isPending: isCreating } = useMutation({
    mutationFn: createAccountFn,
    onSuccess: (account) => {
      toast.success(`Create user ${account!.user!.email} successful!`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { createAccount, isCreating };
};

export { useSignUpAccount };
