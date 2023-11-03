import { ReactNode, useContext } from 'react';

// Components
import { StyledBody, StyledHeader, StyledRow, StyledTable } from './styled';

// Contexts
import TableContext from '../../contexts/TableContext';

export interface ITable {
  columns?: string;
  children: React.ReactNode;
}

interface ITableBody<T> {
  data?: T[];
  render?: (value: T) => JSX.Element;
}

type CallbackMapFunc<T> = (value: T, index: number, array: T[]) => ReactNode;

const Table = ({ columns, children }: ITable) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }: ITable) => {
  const { columns } = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

const Body = <T,>({ data, render }: ITableBody<T>) => {
  return (
    data!.length && (
      <StyledBody>{data?.map(render as CallbackMapFunc<T>)}</StyledBody>
    )
  );
};

const Row = ({ children }: ITable) => {
  const { columns } = useContext(TableContext);
  return <StyledRow columns={columns}>{children}</StyledRow>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
