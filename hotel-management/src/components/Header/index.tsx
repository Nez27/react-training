// Components
import HeaderMenu from '../HeaderMenu';

// Styled
import {StyledHeader} from './styled';

interface IHeader {
  accountName: string;
}

const Header = ({accountName}: IHeader) => {
  return (
    <StyledHeader>
      <p>Hi, {
        accountName
          ? accountName
          : 'Admin'
      }!</p>
      <HeaderMenu/>
    </StyledHeader>
  );
};

export default Header;
