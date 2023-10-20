import styled from 'styled-components';

export const StyledUser = styled.main`
  padding: 20px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h2`
  font-size: var(--fs-md);
  color: var(--dark-text);
  text-transform: capitalize;
`;

export const StyledOperationTable = styled.div`
  text-align: right;
`;
