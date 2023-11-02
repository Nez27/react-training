import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
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
  border-radius: var(--radius-md);
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

export { StyledNav, StyledNavLink };
