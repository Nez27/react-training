import { Outlet } from 'react-router-dom';

// Components
import Header from '@component/Header';
import Sidebar from '@component/Sidebar';

// Styled
import { Main, StyledAppLayout } from './styled';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header accountName="Admin" />
      <Sidebar heading="Hotel Management" />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
