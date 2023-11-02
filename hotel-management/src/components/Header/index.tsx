// Components
import HeaderMenu from '../HeaderMenu';

// Styled
import { StyledHeader } from './styled';

interface IHeader {
  accountName: string
}

const Header = ({accountName}: IHeader) => {
  return (
    <StyledHeader>
      <p>Hi, {accountName}!</p>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
