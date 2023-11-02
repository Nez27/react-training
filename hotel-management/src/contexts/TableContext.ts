import { createContext } from 'react';

interface ITableContext {
  columns?: string;
}

const TableContext = createContext<ITableContext>({});

export default TableContext;
