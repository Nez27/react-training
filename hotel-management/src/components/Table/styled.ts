import styled from 'styled-components';
import { ITable } from '../../globals/interfaces';

export const StyledTable = styled.div`
  border: 1px solid var(--border-color);

  font-size: 20px;
  border-radius: var(--radius-md);
`;

const CommonRow = styled.div<ITable>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 10px;
  align-items: center;
`;

export const StyledBody = styled.div`
  font-size: var(--fs-sm-x);
`;

export const StyledRow = styled(CommonRow)`
  padding: 20px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

export const StyledHeader = styled(CommonRow)`
  padding: 10px 20px;

  border-bottom: 1px solid var(--border-color);
  background-color: var(--header-table-color);
  border-top-left-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);

  font-size: var(--fs-sm);
  text-transform: capitalize;
  font-weight: 600;
`;
