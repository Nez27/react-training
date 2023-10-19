import React, { ReactNode, createContext, useContext } from 'react';
import styled from 'styled-components';

const TableContext = createContext('');

const StyledTable = styled.div`
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

const StyledBody = styled.div`
  font-size: var(--fs-sm-x);
`;

const StyledRow = styled(CommonRow)`
  padding: 20px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 10px 20px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--header-table-color);

  font-size: var(--fs-sm);
  text-transform: capitalize;
  font-weight: 600;
`;

interface ITable {
  $columns?: string;
  children: React.ReactNode;
}

interface ITableBody<T> {
  data?: T[];
  render?: (value: T) => JSX.Element;
}

type CallbackMapFunc<T> = (value: T, index: number, array: T[]) => ReactNode;

const Table = ({ $columns, children }: ITable) => {
  return (
    <TableContext.Provider value={$columns!}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }: ITable) => {
  const columns = useContext(TableContext);
  return <StyledHeader $columns={columns}>{children}</StyledHeader>;
};

const Body = <T,>({ data, render }: ITableBody<T>) => {
  if (data && data.length > 0)
    return <StyledBody>{data?.map(render as CallbackMapFunc<T>)}</StyledBody>;
};

const Row = ({ children }: ITable) => {
  const columns = useContext(TableContext);
  return <StyledRow $columns={columns}>{children}</StyledRow>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
