import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Services
import { login as loginFn } from '@service/authenticationService';

// Types
import { ILogin } from '@type/common';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || null;

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: ILogin) => loginFn({ email, password }),
    onSuccess: (account) => {
      queryClient.setQueryData(['account'], account.user);
      redirectTo ? navigate(redirectTo) : navigate('/');
    },
    onError: (err) => {
      console.error(err.message);
      toast.error('Email or password not correct!');
    },
  });

  return { login, isPending };
};

export { useLogin };
