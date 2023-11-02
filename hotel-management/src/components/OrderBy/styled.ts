import styled, { css } from 'styled-components';

const StyledOrder = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 5px;
  display: flex;
  gap: 10px;
`;

interface IOrderBtn {
  active: boolean;
}

const OrderButton = styled.button<IOrderBtn>`
  border: none;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--primary-color);
      color: var(--light-text);
      cursor: no-drop;
    `}

  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: var(--fs-sm-x);
  padding: 5px 10px;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--hover-dark-background-color);
  }
`;

export { StyledOrder, OrderButton };
