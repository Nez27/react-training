import styled from 'styled-components';

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

export { StyledFormRow, Label, Error };
