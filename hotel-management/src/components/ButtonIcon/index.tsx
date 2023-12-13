import { ButtonHTMLAttributes, ReactNode } from 'react';

// Styled
import { StyledButtonIcon } from './styled';

interface IButtonIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  iconSize?: string;
  iconColor?: string;
  fontSize?: string;
  text?: string;
  variations?: string;
}

const ButtonIcon = ({
  icon,
  iconSize,
  iconColor,
  text,
  fontSize,
  variations,
  ...props
}: IButtonIcon) => {
  return (
    <StyledButtonIcon
      iconColor={iconColor}
      iconSize={iconSize}
      fontSize={fontSize}
      variations={variations}
      {...props}
    >
      {icon} {text && <span>{text}</span>}
    </StyledButtonIcon>
  );
};

export default ButtonIcon;
