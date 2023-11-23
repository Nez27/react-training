import { ReactNode } from 'react';
import { StyledButtonIcon } from './styled';

interface IButtonIcon {
  icon: ReactNode;
  children?: ReactNode;
  style?: {
    fontSize?: string;
    backgroundColor?: string;
    color?: string;
  };
  iconStyle?: {
    color?: string;
    size?: string;
  };
  onClick?: () => void;
}

const ButtonIcon = ({
  icon,
  children,
  style,
  iconStyle,
  onClick,
}: IButtonIcon) => {
  const isHaveChildren = Boolean(children);

  return (
    <StyledButtonIcon
      isHaveChildren={isHaveChildren}
      style={{
        fontSize: style?.fontSize,
        backgroundColor: style?.backgroundColor,
        color: style?.color,
      }}
      iconStyle={iconStyle}
      onClick={onClick}
    >
      {icon} <span>{children}</span>
    </StyledButtonIcon>
  );
};

export default ButtonIcon;
