import { Outlet } from 'react-router-dom';

// Styled
import Spinner from '@commonStyle/Spinner';
import { FullPageLayout } from './styled';

// Hooks
import { useAccount } from '@hook/authentication/useAccount';

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
