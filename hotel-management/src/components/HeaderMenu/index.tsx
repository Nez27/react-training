// Components
import { IoPersonCircleOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import ButtonIcon from '@component/ButtonIcon';

// Styled
import { StyledHeaderMenu } from './styled';

// Hooks
import { useLogout } from '@hook/authentication/useLogout';

const HeaderMenu = () => {
  const { logout, isPending } = useLogout();

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
          onClick={logout}
          disabled={isPending}
          aria-label="Logout"
          icon={<HiOutlineLogout />}
          iconStyle={{ size: '23px' }}
        />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
