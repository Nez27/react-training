// Components
import Nav from '../Nav';

// Styled
import { Heading, StyledSidebar } from './styled';

interface ISidebar {
  heading: string;
}

const Sidebar = ({ heading }: ISidebar) => {
  return (
    <StyledSidebar>
      <Heading>{heading}</Heading>
      <Nav />
    </StyledSidebar>
  );
};

export default Sidebar;
