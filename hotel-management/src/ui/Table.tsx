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

interface ITable {
  columns?: string;
  children?: React.ReactNode;
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
  text-transform: uppercase;
  font-weight: 600;
`;

const Header = ({ children }: ITable) => {
  const columns = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

Table.Header = Header;

export default Table;
