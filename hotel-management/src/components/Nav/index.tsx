// Components
import { BiSolidCalendarAlt } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi2';
import { BsHouseDoorFill } from 'react-icons/bs';

// Styled
import { StyledNav, StyledNavLink } from './styled';

// Constants
import { BOOKING, ROOM, USER } from '@constant/path';

const Nav = () => {
  return (
    <StyledNav>
      <StyledNavLink to={BOOKING}>
        <BiSolidCalendarAlt />
        <span>Booking</span>
      </StyledNavLink>
      <StyledNavLink to={USER}>
        <HiUsers />
        <span>User</span>
      </StyledNavLink>
      <StyledNavLink to={ROOM}>
        <BsHouseDoorFill />
        <span>Room</span>
      </StyledNavLink>
    </StyledNav>
  );
};

export default Nav;
