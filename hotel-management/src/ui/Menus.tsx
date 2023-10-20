import { createContext, useContext, useEffect, useRef, useState } from 'react';
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

// ------------- Interface ------------- //
interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

interface IButton {
  children?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

// ------------- Custom hooks ------------- //
const useOutsideClick = (
  handler: () => void,
  listeningCapturing = true,
): React.MutableRefObject<HTMLUListElement | null> => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listeningCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listeningCapturing);
  }, [handler, listeningCapturing]);

  return ref;
};

// ------------- Menu Component ------------- //
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    openId === '' || openId !== id ? open!(id) : close!();
  };

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
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
  const { openId, close } = useContext(MenusContext);
  const ref = useOutsideClick(close!, false);

  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
};

const Button = ({ children, icon, onClick }: IButton): React.JSX.Element => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close!();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
