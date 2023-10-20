import { ReactNode, createContext, useContext } from 'react';

// Components
import { StyledBody, StyledHeader, StyledRow, StyledTable } from './styled';

// Interface
import { ITable, ITableBody } from '../../globals/interfaces';

const TableContext = createContext('');

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
