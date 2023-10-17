import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--border-color);
  padding: 20px 40px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <p>Hi, Admin!</p>
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
