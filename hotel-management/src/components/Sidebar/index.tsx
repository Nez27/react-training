// Components
import Nav from '../Nav';

// Styled
import { Heading, StyledSidebar } from './styled';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Heading>Hotel Management</Heading>
      <Nav />
    </StyledSidebar>
  );
};

export default Sidebar;
