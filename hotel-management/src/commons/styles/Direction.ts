import styled, { css } from 'styled-components';

interface IDirection {
  type?: 'vertical' | 'horizontal';
}

const Direction = styled.div<IDirection>`
  display: flex;

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 20px;
    `}
`;

Direction.defaultProps = {
  type: 'vertical',
};

export default Direction;
