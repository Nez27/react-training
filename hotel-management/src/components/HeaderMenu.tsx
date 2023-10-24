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
      <ButtonIcon>
        <IoPersonCircleOutline />
      </ButtonIcon>
      <ButtonIcon>
        <HiOutlineLogout />
      </ButtonIcon>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
