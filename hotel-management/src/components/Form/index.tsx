import { FormEvent, ReactNode } from 'react';

// Styled
import {
  StyledActionBtn,
  StyledForm,
  Error,
  Label,
  StyledFormRow,
  FormBtn,
} from './styled';

// Types
import { TDirection } from '@src/types/common';

interface IFormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
}

interface IFormRow {
  label: string;
  error?: string;
  children: ReactNode;
  direction?: TDirection;
}

const Form = ({ children, onSubmit, id }: IFormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} id={id}>
      {children}
    </StyledForm>
  );
};

const FormRow = ({
  label,
  error,
  children,
  direction
}: IFormRow) => {
  return (
    <StyledFormRow direction={direction}>
      <Label>{label}</Label>
      <div>
        {children}
        {error && <Error>{error}</Error>}
      </div>
    </StyledFormRow>
  );
};

Form.Row = FormRow;
Form.Action = StyledActionBtn;
Form.Button = FormBtn;

export default Form;
