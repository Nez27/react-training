import { Outlet } from 'react-router-dom';

// Components
import Header from '@component/Header';
import Sidebar from '@component/Sidebar';

// Styled
import { Main, StyledAppLayout } from './styled';

// Hooks
import { useAccount } from '@hook/authentication/useAccount';

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
