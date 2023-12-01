import { useQuery } from '@tanstack/react-query';

// Services
import { getCurrentAccount } from '@service/authenticationService';

/**
 * Get data of account currently login
 * @returns The data of account currently login
 */
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
