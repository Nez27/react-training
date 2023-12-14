import { MouseEvent, ReactNode, useContext, useState } from 'react';

// Components
import { HiEllipsisVertical } from 'react-icons/hi2';
import ButtonIcon from '../ButtonIcon';

// Hooks
import { useOutsideClick } from '@src/hooks/useOutsideClick';

// Styled
import { StyledMenu, StyledList, StyledToggle } from './styled';

// Contexts
import MenusContext from '@src/contexts/MenuContext';

// Types
import { Nullable } from '@src/types/common';

interface IButton {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Menus = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState('');
  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }): ReactNode => {
  const { openId, close, open } = useContext(MenusContext);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openId !== id ? open!(id) : close!();
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
  const ref = useOutsideClick<HTMLUListElement>(close!, false);

  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
};

const Button = ({ label, icon, onClick, disabled }: IButton): ReactNode => {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close!();
  };

  return (
    <li>
      <ButtonIcon
        text={label}
        aria-label={label}
        icon={icon}
        iconColor='var(--primary-color)'
        onClick={handleClick}
        disabled={disabled}
      />
    </li>
  );
};

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
