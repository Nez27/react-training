import styled from 'styled-components';

interface ICommonRow {
  width: string;
}

const StyledTable = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);

  font-size: 20px;
`;

const CommonRow = styled.div<ICommonRow>`
  display: grid;
  grid-template-columns: ${(props) => props.width};
  column-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const StyledBody = styled.div`
  font-size: var(--fs-sm-x);
`;

const StyledRow = styled(CommonRow)`
  padding: 20px;

  &.active {
    background-color: red;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 10px 20px;

  border-bottom: 1px solid var(--border-color);
  background-color: var(--header-table-color);
  border-top-left-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);

  font-size: var(--fs-sm);
  text-transform: capitalize;
  font-weight: 600;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  background-color: var(--footer-table-color);
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);

  border-top: 1px solid var(--border-color);

  &:not(:has(*)) {
    display: none;
  }
`;

export { StyledBody, StyledHeader, StyledRow, StyledTable, StyledFooter };
