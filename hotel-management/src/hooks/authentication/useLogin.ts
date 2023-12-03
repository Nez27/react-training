import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Services
import { login as loginFn } from '@service/authenticationService';

/**
 * Login web
 * @returns The login function and isPending boolean
 */
const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: (account) => {
      queryClient.setQueryData(['account'], account.user);

      navigate('/');
    },
    onError: (err) => {
      console.error(err.message);
      toast.error('Email or password not correct!');
    },
  });

  return { login, isPending };
};

export { useLogin };
