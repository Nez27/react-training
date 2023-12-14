import styled from 'styled-components';

const StyledBooking = styled.main`
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: var(--fs-md);
  color: var(--dark-text);
  text-transform: capitalize;
`;

const StyledTableOption = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-end;
`;

const ActionTable = styled.div`
  display: flex;
  gap: 30px;
`

export {
  StyledBooking,
  Title,
  StyledTableOption,
  ActionTable
};
