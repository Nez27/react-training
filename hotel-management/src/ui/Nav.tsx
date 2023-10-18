import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { MdSpaceDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi2';
import { BsHouseDoorFill } from 'react-icons/bs';

const StyledNav = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border-radius: var(--radius-sm);
  transition: all 0.3s;

  & svg {
    width: 25px;
    height: 25px;
    transition: all 0.3s;
  }

  &:hover,
  &.active {
    background-color: var(--hover-background-color);
  }

  &:hover svg,
  &.active svg {
    color: var(--primary-color);
  }
`;

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
