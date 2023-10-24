import styled from 'styled-components';

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: var(--fs-sm-x);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: var(--hover-background-color);
  }

  & svg {
    width: 18px;
    height: 18px;
    color: var(--primary-color);
    transition: all 0.3s;
  }
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: var(--radius-sm);
  transform: translateX(5px);
  transition: all 0.2s;

  &:hover {
    background-color: var(--hover-background-color);
  }

  & svg {
    width: 18px;
    height: 18px;
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1000;

  background-color: white;
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-sm);

  right: -10px;
  top: 40px;
`;

export { StyledMenu, StyledButton, StyledList, StyledToggle };
