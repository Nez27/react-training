import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { StyledSelect } from './styled';

export interface ISelectOptions {
  value: string;
  label: string;
}
interface ISelect {
  options: ISelectOptions[];
  optionsConfigForm?: RegisterOptions<FieldValues, string> | undefined;
  value?: number;
  id: string;
}

const Select = ({ options, id, optionsConfigForm }: ISelect) => {
  const { register } = useFormContext() ?? {};

  if(!register) {
    return null;
  }

  if (!options) return;

  return (
    <StyledSelect
      aria-label="Sort"
      id={id}
      {...register(id, optionsConfigForm)}
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
