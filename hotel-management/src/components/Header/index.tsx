// Components
import HeaderMenu from '../HeaderMenu';

// Styled
import { StyledHeader } from './styled';

const Header = () => {
  return (
    <StyledHeader>
      <p>Hi, Admin!</p>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
