import styled from 'styled-components';

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

export {
  StyledUser,
  Title,
  StyledOperationTable
};
