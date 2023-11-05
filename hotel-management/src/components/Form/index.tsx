import { FormEvent, ReactNode } from 'react';

// Styled
import { StyledActionBtn, StyledForm } from './styled';

interface IFormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  id?: string;
}

const Form = ({ children, onSubmit, id }: IFormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} id={id}>
      {children}
    </StyledForm>
  );
};

Form.Action = StyledActionBtn;

export default Form;
