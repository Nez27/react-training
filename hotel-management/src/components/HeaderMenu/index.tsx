// Components
import { IoPersonCircleOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import ButtonIcon from '@component/ButtonIcon/ButtonIcon';

// Styled
import { StyledHeaderMenu } from './styled';

const HeaderMenu = () => {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          aria-label="Profile"
          icon={<IoPersonCircleOutline />}
          iconStyle={{ size: '23px' }}
        />
      </li>
      <li>
        <ButtonIcon
          aria-label="Logout"
          icon={<HiOutlineLogout />}
          iconStyle={{size: '23px' }}
        />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
