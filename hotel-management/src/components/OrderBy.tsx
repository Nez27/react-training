import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 5px;
  display: flex;
  gap: 10px;
`;

interface IFilterBtn {
  active: boolean;
}

const FilterButton = styled.button<IFilterBtn>`
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

interface IFilterProps {
  options: {
    value: string;
    label: string;
  }[];
}

function OrderBy({ options }: IFilterProps) {
  const field = 'orderBy';

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(field) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(field, value);

    setSearchParams(searchParams);
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default OrderBy;
