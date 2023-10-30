import styled from 'styled-components';

interface ISelect {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const StyledSelect = styled.select`
  font-size: var(--fs-sm-x);
  padding: 5px 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-weight: 500;
`;

function Select({ options, value, onChange }: ISelect) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
