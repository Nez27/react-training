import { ISelectOptions } from '../../globals/interfaces';
import { StyledSelect } from './styled';

interface ISelect {
  options: ISelectOptions[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name?: string;
}

const Select = ({ options, value, onChange, name }: ISelect) => {
  if (!options) return;

  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      aria-label="Sort"
      name={name}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
