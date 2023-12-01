import styled, { css } from 'styled-components';

interface IStyledButtonIcon {
  isHaveChildren: boolean;
  style?: {
    fontSize?: string;
    backgroundColor?: string;
    color?: string;
  };
  iconStyle?: {
    color?: string;
    size?: string;
  };
}

const StyledButtonIcon = styled.button<IStyledButtonIcon>`
  background: none;

  padding: 10px;
  transition: all 0.2s;

  border: none;

  ${(props) =>
    props.style?.fontSize &&
    css`
      font-size: ${props.style.fontSize};
    `}

  ${(props) =>
    props.style?.fontSize &&
    css`
      font-size: ${props.style.fontSize};
    `}

  ${(props) =>
    props.color &&
    css`
      font-size: ${props.color};
    `}

  ${(props) =>
    props.isHaveChildren
      ? css`
          display: flex;
          align-items: center;
          gap: 10px;

          text-align: left;
          width: 100%;
        `
      : css`
          border-radius: var(--radius-md);
        `}

  &:hover {
    background-color: var(--hover-background-color);
  }

  & svg {
    ${(props) =>
      props.iconStyle?.size &&
      css`
        width: ${props.iconStyle.size};
        height: ${props.iconStyle.size};
      `}

    ${(props) =>
      props.iconStyle?.color &&
      css`
        color: ${props.iconStyle.color};
      `}
    transition: all 0.3s;
  }
`;

StyledButtonIcon.defaultProps = {
  style: {
    fontSize: '14px',
    backgroundColor: 'var(--primary-color)',
    color: '#000',
  },
  iconStyle: {
    color: '#000',
    size: '14px',
  },
};

export { StyledButtonIcon };
