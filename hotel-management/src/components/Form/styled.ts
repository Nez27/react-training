import Button from '@commonStyle/Button';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledActionBtn = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 100px;
`;

const StyledFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
`;

const Label = styled.label`
  font-size: var(--fs-sm);
  text-transform: capitalize;
`;

const Error = styled.p`
  color: var(--error-text);
  font-size: var(--fs-sm-2x);

  margin-top: 5px;
  padding-inline: 5px;

  width: 220px;
`;

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
  }
`;

export { StyledForm, StyledActionBtn, StyledFormRow, Label, Error, FormBtn };
