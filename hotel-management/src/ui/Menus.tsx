import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
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
  gap: 5px;
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
    color: var(--primary-color);
  }
`;

const StyledList = styled.ul<IListPos>`
  position: absolute;
  z-index: 1000;

  background-color: white;
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-sm);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

interface IListPos {
  $position: {
    x: number;
    y: number;
  };
}

interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

const MenusContext = createContext<IMenusContext>({});

const Menus = ({ children }: { children: JSX.Element }) => {
  const [openId, setOpenId] = useState('');

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }): React.JSX.Element => {
  const { openId, close, open } = useContext(MenusContext);

  const handleClick = () => {
    openId === '' || openId !== id ? open!(id) : close!();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({
  id,
  children,
}: {
  id: string;
  children: JSX.Element[];
}): React.JSX.Element | null => {
  const { openId } = useContext(MenusContext);

  if (openId !== id) return null;

  return <StyledList $position={{ x: -10, y: 40 }}> {children}</StyledList>;
};

const Button = ({ children }: { children: string }): React.JSX.Element => {
  return (
    <li>
      <StyledButton>{children}</StyledButton>
    </li>
  );
};

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
