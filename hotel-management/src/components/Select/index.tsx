import {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  useFormContext,
} from 'react-hook-form';
import { StyledSelect } from './styled';
import React, { ReactNode } from 'react';

export interface ISelectOptions {
  value: string;
  label: string;
}
interface ISelect {
  options: ISelectOptions[];
  optionsConfigForm?: RegisterOptions<FieldValues, string> | undefined;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  id?: string;
  ariaLabel: string;
}

interface IRender extends ISelect {
  register: UseFormRegister<FieldValues>;
  children: ReactNode[];
}

const RenderSelect = ({
  options,
  id,
  value,
  optionsConfigForm,
  onChange,
  register,
  children,
  ariaLabel,
}: IRender) => {
  if (options && !register) {
    return (
      <StyledSelect
        aria-label={ariaLabel}
        id={id}
        value={value}
        onChange={onChange}
      >
        {children}
      </StyledSelect>
    );
  }

  return (
    <StyledSelect
      aria-label={ariaLabel}
      id={id}
      value={value}
      {...register(id!, optionsConfigForm)}
    >
      {children}
    </StyledSelect>
  );
};

const Select = ({
  options,
  id,
  optionsConfigForm,
  value,
  onChange,
  ariaLabel
}: ISelect) => {
  const { register } = useFormContext() ?? {};

  if (!options) return;

  return (
    <RenderSelect
      register={register}
      options={options}
      optionsConfigForm={optionsConfigForm}
      id={id}
      value={value}
      onChange={onChange}
      ariaLabel={ariaLabel}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </RenderSelect>
  );
};

export default Select;
