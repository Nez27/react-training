import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 8px;
  transition: all 0.2s;
  border-radius: var(--radius-md);

  &:hover {
    background-color: var(--hover-background-color);
  }

  & svg {
    width: 25px;
    height: 25px;
  }
`;

export default ButtonIcon;
