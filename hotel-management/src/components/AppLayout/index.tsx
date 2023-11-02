import { Outlet } from 'react-router-dom';

// Components
import Header from '../Header';
import Sidebar from '../Sidebar';

// Styled
import { Main, StyledAppLayout } from './styled';

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
