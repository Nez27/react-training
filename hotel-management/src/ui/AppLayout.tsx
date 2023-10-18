import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  border: 1px solid var(--border-color);
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
