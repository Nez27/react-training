import { ColumnProps } from '@src/types/common';
import {
  StyledBody,
  StyledFooter,
  StyledHeader,
  StyledRow,
  StyledTable,
} from './styled';
import Pagination from '../Pagination';

const parseWidthString = (columnsWidth: number[]): string => {
  let result: string = '';

  const totalWidth = columnsWidth.reduce((partialSum, a) => partialSum + a, 0);
  columnsWidth.forEach((width) => {
    result += Math.round((width / totalWidth) * 100).toString() + '% ';
  });

  return result;
};

type Props<T> = {
  columns: ColumnProps[];
  rows: T[];
  count?: number | null;
};

const Table = <T,>({ rows, columns, count }: Props<T>) => {
  const width = parseWidthString(columns.map((item) => item.width));

  const headers = columns.map((column, index) => {
    return <div key={`headCell-${index}`}>{column.title}</div>;
  });

  const renderRows = rows.map((row, rowIndex) => {
    return (
      <StyledRow
        key={`row-${rowIndex}`}
        width={width}
        onClick={
          row[
            'onClick' as keyof typeof row
          ] as React.MouseEventHandler<HTMLDivElement>
        }
      >
        {columns.map((column, columnIndex) => {
          const value = row[column.key as keyof typeof row] as string;

          return <div key={`cell-${columnIndex}`}>{value}</div>;
        })}
      </StyledRow>
    );
  });

  return (
    <StyledTable>
      <StyledHeader width={width}>{headers}</StyledHeader>

      <StyledBody>{renderRows}</StyledBody>

      {Boolean(count) && (
        <StyledFooter>
          <Pagination count={count!} />
        </StyledFooter>
      )}
    </StyledTable>
  );
};

export default Table;
