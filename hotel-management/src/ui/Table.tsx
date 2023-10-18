import React, { createContext, useContext } from 'react';
import styled from 'styled-components';

const TableContext = createContext('');

const StyledTable = styled.div`
  border: 1px solid var(--border-color);

  font-size: 20px;
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

const CommonRow = styled.div<ITable>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 10px;
  align-items: center;
`;

const StyledEmpty = styled.p`
  font-size: var(--fs-sm);
  text-align: center;
  padding: 20px;
`;

const StyledBody = styled.div`
  margin: 10px;
`;

const StyledRow = styled(CommonRow)`
  padding: 10px;
`;

interface ITable {
  columns?: string;
  children?: React.ReactNode;
}

interface ITableBody<T> {
  data?: T[];
  render?: (value: T, index: number, array: T[]) => T;
}

const Table = ({ columns = '', children }: ITable) => {
  return (
    <TableContext.Provider value={columns}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const StyledHeader = styled(CommonRow)`
  font-size: var(--fs-sm);
  padding: 10px 20px;
  border-bottom: 1px solid var(--border-color);
  text-transform: capitalize;
  font-weight: 600;
`;

const Header = ({ children }: ITable) => {
  const columns = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

const Body = <T extends string>({ data, render }: ITableBody<T>) => {
  if (data && !data.length) return <StyledEmpty>No data!</StyledEmpty>;

  return <StyledBody>{data?.map(render!)}</StyledBody>;
};

const Row = ({ children }: ITable) => {
  const columns = useContext(TableContext);
  return <StyledRow columns={columns}>{children}</StyledRow>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
