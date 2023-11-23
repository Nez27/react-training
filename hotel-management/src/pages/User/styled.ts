import styled from 'styled-components';

// Components
import Button from '../../commons/styles/Button';

const StyledUser = styled.main`
  padding: 20px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: var(--fs-md);
  color: var(--dark-text);
  text-transform: capitalize;
`;

const StyledOperationTable = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-end;
`;

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
  }
`;

export { StyledUser, Title, StyledOperationTable, FormBtn };
