import styled, { RuleSet, css } from 'styled-components';

interface IVariations {
  [key: string]: RuleSet<object>;
}

const variations: IVariations = {
  primary: css`
    background-color: var(--primary-color);
    color: var(--light-text);
  `,
  secondary: css`
    background-color: var(--secondary-btn-color);
  `,
  danger: css`
    background-color: var(--danger-btn-color);
    color: var(--light-text);
  `,
};

interface IButtonStyle {
  variations?: keyof IVariations;
}

const Button = styled.button<IButtonStyle>`
  padding: 10px 20px;

  text-transform: uppercase;
  font-weight: 600;

  cursor: pointer;

  border-radius: var(--radius-md);

  ${(props) => variations[props.variations!]}

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    background-color: var(--disabled-btn-color);
  }
`;

Button.defaultProps = {
  variations: 'primary',
};

export default Button;
