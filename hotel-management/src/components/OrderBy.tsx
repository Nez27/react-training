import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
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

  ${(props) =>
    props.active &&
    css`
      background-color: var(--primary-color);
      color: var(--light-text);
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

interface IOrderProps {
  options: {
    value: string;
    label: string;
  }[];
}

const OrderBy = memo(({ options }: IOrderProps) => {
  const field = 'orderBy';

  const [searchParams, setSearchParams] = useSearchParams();
  const currentOrder = searchParams.get(field) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(field, value);

    setSearchParams(searchParams);
  };

  return (
    <StyledOrder>
      {options.map((option) => (
        <OrderButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentOrder}
          disabled={option.value === currentOrder}
        >
          {option.label}
        </OrderButton>
      ))}
    </StyledOrder>
  );
});

export default OrderBy;
