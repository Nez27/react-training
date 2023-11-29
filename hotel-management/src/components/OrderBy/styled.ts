import styled, { css } from 'styled-components';

const StyledOrder = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 5px;
  display: flex;
  gap: 10px;
`;

interface IOrderBtn {
  disabled: boolean;
}

const OrderButton = styled.button<IOrderBtn>`
  border: none;
  border-radius: var(--radius-sm);

  cursor: pointer;
  transition: all 0.3s;

  font-weight: 500;
  font-size: var(--fs-sm-x);
  
  padding: 5px 10px;
  
  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--primary-color);
      color: var(--light-text);
      cursor: not-allowed;
    `}

  &:hover:not(:disabled) {
    background-color: var(--hover-dark-background-color);
  }
`;

export { StyledOrder, OrderButton };
