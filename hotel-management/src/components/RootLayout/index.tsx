import { Outlet } from 'react-router-dom';

// Styled
import Spinner from '@src/commons/styles/Spinner';
import { FullPageLayout } from './styled';

// Hooks
import { useAccount } from '@src/hooks/authentication/useAccount';

const RootLayout = () => {
  const { isPending } = useAccount();

  return isPending ? (
    <FullPageLayout>
      <Spinner />
    </FullPageLayout>
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
