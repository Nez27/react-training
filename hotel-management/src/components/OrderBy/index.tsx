import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Styled
import { OrderButton, StyledOrder } from './styled';

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
