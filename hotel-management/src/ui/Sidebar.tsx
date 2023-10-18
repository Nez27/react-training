import styled from 'styled-components';

// Components
import Nav from './Nav';

const StyledSidebar = styled.aside`
  padding: 50px 20px;

  grid-row: 1 / 3;
  border: 1px solid var(--border-color);
`;

const Heading = styled.h1`
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
  color: var(--primary-color);
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Heading>Hotel Management</Heading>
      <Nav />
    </StyledSidebar>
  );
};

export default Sidebar;
