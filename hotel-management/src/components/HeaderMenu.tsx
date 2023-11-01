import styled from 'styled-components';

// Components
import { IoPersonCircleOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import ButtonIcon from '../commons/styles/ButtonIcon';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 10px;
`;

const HeaderMenu = () => {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon aria-label="Profile">
          <IoPersonCircleOutline />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon aria-label="Logout">
          <HiOutlineLogout />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
