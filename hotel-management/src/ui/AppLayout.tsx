import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

// Components
import Header from './Header';
import Sidebar from './Sidebar';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  border: 1px solid var(--border-color);

  overflow: scroll;
`;

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
