import styled, { css, RuleSet } from 'styled-components';

interface IStyledButtonIcon {
  iconSize?: string;
  iconColor?: string;
  fontSize?: string;
  variations?: string;
}

export interface IVariations {
  [key: string]: RuleSet<object>;
}

const variations: IVariations = {
  success: css`
    background-color: var(--success-btn-color);
    color: var(--light-text);

    &:hover {
      background-color: var(--success-btn-hover-color);
    }
    
    &:disabled {
      background-color: var(--success-btn-hover-color);
    }
  `,
  primary: css`
    background-color: var(--primary-color);
    color: var(--light-text);
    
    &:hover {
      background-color: var(--primary-hover-color);
    }
  `,
  danger: css`
    background-color: var(--danger-btn-color);
    color: var(--light-text);
    
    &:hover {
      background-color: var(--danger-btn-hover-color);
    }

    &:disabled {
      background-color: var(--danger-btn-hover-color);
    }
  `,
  default: css`
    &:hover {
      background-color: var(--hover-background-color);
    }
  `,
};

const StyledButtonIcon = styled.button<IStyledButtonIcon>`
  background: none;

  display: flex;
  align-items: center;
  gap: 8px;

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}

  padding: 10px 20px;
  transition: all 0.2s;

  border: none;
  border-radius: var(--radius-md);
  
  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => variations[props.variations!]}

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
  fontSize: 'var(--fs-sm-2x)',
  variations: 'default',
};

export { StyledButtonIcon };
