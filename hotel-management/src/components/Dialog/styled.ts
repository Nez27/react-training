import styled from 'styled-components';

const StyledDialog = styled.dialog`
  border-radius: var(--radius-sm);
  border-color: var(--border-color);
`;

const StyledTitle = styled.p`
  font-size: var(--fs-md);
  text-transform: capitalize;
  font-weight: 600;

  padding: 20px 40px;
  border-bottom: 1px solid var(--border-color);

  text-align: center;
`;

const StyledBody = styled.div`
  padding: 10px 20px;
`;

export { StyledDialog, StyledTitle, StyledBody };
