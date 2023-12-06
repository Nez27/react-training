import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header';
import Sidebar from '../Sidebar';

// Styled
import { Main, StyledAppLayout } from './styled';

// Hooks
import { useAccount } from '@src/hooks/authentication/useAccount';

const AppLayout = () => {
  const { account } = useAccount();

  return (
    <StyledAppLayout>
      <Header accountName={account?.user_metadata.fullName} />
      <Sidebar heading="Hotel Management" />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
