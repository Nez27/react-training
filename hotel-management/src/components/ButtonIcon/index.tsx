import { ButtonHTMLAttributes, ReactNode } from 'react';

// Styled
import { StyledButtonIcon } from './styled';

interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  iconSize?: string;
  iconColor?: string;
  text?: string;
}

const ButtonIcon = ({
  icon,
  iconSize,
  iconColor,
  text,
  ...props
}: IButtonIcon) => {
  return (
    <StyledButtonIcon
      iconColor={iconColor}
      iconSize={iconSize}
      {...props}
    >
      {icon} {text && <span>{text}</span>}
    </StyledButtonIcon>
  );
};

export default ButtonIcon;
