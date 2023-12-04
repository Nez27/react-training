import { useAccount } from '@hook/authentication/useAccount';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IRouteProtected {
  children: ReactNode;
}
const RouteProtected = ({ children }: IRouteProtected) => {
  // Load user login
  const { account } = useAccount();

  return !account
    ? <Navigate to="/login" />
    : children;
};

export default RouteProtected;
