// Components
import { MdSpaceDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi2';
import { BsHouseDoorFill } from 'react-icons/bs';

// Styled
import { StyledNav, StyledNavLink } from './styled';

const Nav = () => {
  return (
    <StyledNav>
      <StyledNavLink to={'/dashboard'}>
        <MdSpaceDashboard />
        <span>Dashboard</span>
      </StyledNavLink>
      <StyledNavLink to={'/user'}>
        <HiUsers />
        <span>User</span>
      </StyledNavLink>
      <StyledNavLink to={'/room'}>
        <BsHouseDoorFill />
        <span>Room</span>
      </StyledNavLink>
    </StyledNav>
  );
};

export default Nav;
