import styled, { css } from 'styled-components';

// Types
import { TDirection } from '@src/types/common';

interface IDirection {
  type?: TDirection;
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
