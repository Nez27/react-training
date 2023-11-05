import styled, { css } from 'styled-components';

interface IButtonStyle {
  styled?: 'primary' | 'secondary';
}

const Button = styled.button<IButtonStyle>`
  padding: 10px 20px;

  text-transform: uppercase;
  font-weight: 600;

  cursor: pointer;
  
  border-radius: var(--radius-md);

  ${(props) =>
    props.styled === 'primary' &&
    css`
      background-color: var(--primary-color);
      color: var(--light-text);
    `}

  ${(props) =>
    props.styled === 'secondary' &&
    css`
      background-color: var(--secondary-btn-color);
    `}
`;

Button.defaultProps = {
  styled: 'primary',
};

export default Button;
