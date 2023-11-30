import { useQuery } from '@tanstack/react-query';

// Services
import { getCurrentAccount } from '@service/authenticationService';

const useAccount = () => {
  let isAuthenticated: boolean = false;
  const { data: account, isPending } = useQuery({
    queryKey: ['account'],
    queryFn: getCurrentAccount,
  });

  if (account) {
    isAuthenticated = account.role === 'authenticated';
  }

  return { isPending, account, isAuthenticated };
};

export { useAccount };
