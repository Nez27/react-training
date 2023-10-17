import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';

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
