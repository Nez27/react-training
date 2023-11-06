import styled, { css } from 'styled-components';

// Styled
import CommonInput from './CommonInput';

type TInput = 'text' | 'checkbox' | 'hidden';

interface IInputTyped {
  type?: TInput;
}

const Input = styled.input<IInputTyped>`
  ${CommonInput}

  ${(props) =>
    props.type === 'checkbox' &&
    css`
      width: 20px;
      height: 20px;
    `}
`;

Input.defaultProps = {
  type: 'text',
};

export default Input;
