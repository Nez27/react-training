import { ReactNode } from 'react';

// Styled
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
  disabled?: boolean;
}

const ButtonIcon = ({
  icon,
  children,
  style,
  iconStyle,
  onClick,
  disabled,
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
      disabled={disabled}
    >
      {icon} <span>{children}</span>
    </StyledButtonIcon>
  );
};

export default ButtonIcon;
