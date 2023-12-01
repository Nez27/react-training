import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Services
import { logout as logoutFn } from '@service/authenticationService';

/**
 * Logout web
 * @returns The logout function and isPending boolean
 */
const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPending };
};

export { useLogout };
