import { MouseEvent, ReactNode, useContext, useState } from 'react';

// Components
import { HiEllipsisVertical } from 'react-icons/hi2';

// Hooks
import { useOutsideClick } from '../../hooks/useOutsideClick';

// Styled
import { StyledMenu, StyledButton, StyledList, StyledToggle } from './styled';

// Contexts
import MenusContext from '../../contexts/MenuContext';

// Types
import { Nullable } from '../../globals/types';

interface IButton {
  children?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const Menus = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState('');
  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }): ReactNode => {
  const { openId, close, open } = useContext(MenusContext);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openId === '' || openId !== id 
      ? open!(id) 
      : close!();
  };

  return (
    <StyledToggle onClick={handleClick} aria-label={`Menu item ${id}`}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}): Nullable<ReactNode> => {
  const { openId, close } = useContext(MenusContext);
  const ref = useOutsideClick(close!, false);

  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
};

const Button = ({ children, icon, onClick }: IButton): ReactNode => {
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
