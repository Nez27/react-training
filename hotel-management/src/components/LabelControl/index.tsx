import { ReactNode } from 'react';

// Styled
import { Error, Label, StyledFormRow } from './styled';

interface IFormRow {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormRow = ({ label, error, children }: IFormRow) => {
  return (
    <StyledFormRow>
      <Label>{label}</Label>
      <div>
        {children}
        {error && <Error>{error}</Error>}
      </div>
    </StyledFormRow>
  );
};

export default FormRow;
