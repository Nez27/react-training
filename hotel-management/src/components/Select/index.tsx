import {
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { ChangeEventHandler } from 'react';

// Styled
import { StyledSelect } from './styled';

export interface ISelectOptions {
  value: string;
  label: string;
}
interface ISelect {
  options: ISelectOptions[];
  optionsConfigForm?: RegisterOptions<FieldValues, string> | undefined;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  id?: string;
  ariaLabel: string;
}

const Select = ({
  options,
  id,
  optionsConfigForm,
  value,
  onChange,
  ariaLabel,
}: ISelect) => {
  const { register } = useFormContext() ?? {};

  if (!options) return;

  return (
    <StyledSelect
      aria-label={ariaLabel}
      id={id}
      value={value}
      {...(register
        ? { ...register(id!, optionsConfigForm) }
        : { onChange: onChange })}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value} data-testid='select-option'>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
