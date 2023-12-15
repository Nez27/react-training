// Components
import { BiSolidCalendarAlt } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi2';
import { BsHouseDoorFill } from 'react-icons/bs';

// Styled
import { StyledNav, StyledNavLink } from './styled';

// Constants
import {BOOKING, ROOM, SIGN_UP_ACCOUNT, USER} from '@src/constants/path';
import {FaUserPlus} from "react-icons/fa6";

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
      <StyledNavLink to={SIGN_UP_ACCOUNT}>
        <FaUserPlus />
        <span>Create Account</span>
      </StyledNavLink>
    </StyledNav>
  );
};

export default Nav;
