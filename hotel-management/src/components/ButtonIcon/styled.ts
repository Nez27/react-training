import styled, { css } from 'styled-components';

interface IStyledButtonIcon {
  iconSize?: string;
  iconColor?: string;
}

const StyledButtonIcon = styled.button<IStyledButtonIcon>`
  background: none;

  display: flex;
  align-items: center;
  gap: 8px;

  font-size: var(--fs-sm-2x);

  padding: 10px;
  transition: all 0.2s;
  width: 100%;

  border: none;

  &:hover {
    background-color: var(--hover-background-color);
  }

  & svg {
    ${(props) =>
      props.iconSize &&
      css`
        width: ${props.iconSize};
        height: ${props.iconSize};
      `}

    ${(props) =>
      props.iconColor &&
      css`
        color: ${props.iconColor};
      `}

    transition: all 0.3s;
  }
`;

StyledButtonIcon.defaultProps = {
  iconSize: '16px',
  iconColor: '#000',
};

export { StyledButtonIcon };
