// Components
import Nav from '@component/Nav';

// Styled
import { Heading, StyledSidebar } from './styled';
import { useNavigate } from 'react-router-dom';

interface ISidebar {
  heading: string;
}

const Sidebar = ({ heading }: ISidebar) => {
  const navigate = useNavigate();

  return (
    <StyledSidebar>
      <Heading onClick={() => navigate('/')}>{heading}</Heading>
      <Nav />
    </StyledSidebar>
  );
};

export default Sidebar;
