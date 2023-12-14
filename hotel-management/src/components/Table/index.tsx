// Types
import {ColumnProps} from '@src/types/common';

// Styled
import {
  StyledBody,
  StyledFooter,
  StyledHeader,
  StyledRow,
  StyledTable,
} from './styled';

// Components
import Pagination from '../Pagination';
import {TbArrowNarrowRight} from 'react-icons/tb';
import {StyledTableOption} from '@src/pages/Room/styled.ts';
import OrderBy from '@src/components/OrderBy';
import {ORDERBY_OPTIONS} from '@src/constants/commons.ts';
import SortBy from '@src/components/SortBy';
import Search from '@src/components/Search';
import Direction from '@src/commons/styles/Direction.ts';
import {Dispatch, SetStateAction} from 'react';

const parseWidthString = (columnsWidth: number[]): string => {
  let result: string = '';

  const totalWidth = columnsWidth.reduce((
    partialSum,
    a
  ) => partialSum + a, 0);
  columnsWidth.forEach((width) => {
    result += Math.round((
      width / totalWidth
    ) * 100)
      .toString() + '% ';
  });

  return result;
};

type Props<T> = {
  columns: ColumnProps[];
  rows: T[];
  stateSelected: {
    itemSelected: T | undefined;
    setItemSelected: Dispatch<SetStateAction<T | undefined>>;
  };
  count?: number | null;
  onRowClick?: (rowData: T) => void;
  enabledOrder?: boolean;
  sortBy?: {
    value: string;
    label: string;
  }[];
  searchPlaceHolder?: string;
};

const Table = <T, >({
  rows,
  columns,
  count,
  onRowClick,
  stateSelected,
  sortBy,
  searchPlaceHolder,
  enabledOrder = false,
}: Props<T>) => {
  const width = parseWidthString(columns.map((item) => item.width));
  const {itemSelected, setItemSelected} = stateSelected;

  const headers = columns.map((
    column,
    index
  ) => {
    return <div key={`headCell-${index}`}>{column.title}</div>;
  });

  const renderRows = rows.map((
    row,
    rowIndex
  ) => {
    const handleRowClick = () => {
      if (onRowClick) {
        onRowClick(row);
        setItemSelected(row);
      }
    };

    return (
      <StyledRow
        key={`row-${rowIndex}`}
        width={width}
        onDoubleClick={handleRowClick}
        className={
          JSON.stringify(itemSelected) === JSON.stringify(row)
            ? 'selected'
            : ''
        }
      >
        {columns.map((
          column,
          columnIndex
        ) => {
          const value = row[column.key as keyof typeof row] as string;

          if (column.isDateValue) {
            return (
              <div
                style={{display: 'flex', alignItems: 'center'}}
                key={`cell-${columnIndex}`}
              >
                {value[0]} &nbsp; <TbArrowNarrowRight/>
                &nbsp; {value[1]}
              </div>
            );
          }

          return <div key={`cell-${columnIndex}`}>{value}</div>;
        })}
      </StyledRow>
    );
  });

  return (
    <Direction>
      <StyledTableOption>
        {enabledOrder && <OrderBy options={ORDERBY_OPTIONS}/>}
        {Boolean(sortBy?.length) && <SortBy options={sortBy!}/>}
        {Boolean(searchPlaceHolder) && <Search setPlaceHolder={searchPlaceHolder!}/>}
      </StyledTableOption>

      {rows && rows.length &&
        (
          <StyledTable>
            <StyledHeader width={width}>{headers}</StyledHeader>

            <StyledBody>{renderRows}</StyledBody>

            {Boolean(count) && (
              <StyledFooter>
                <Pagination count={count!}/>
              </StyledFooter>
            )}
          </StyledTable>
        )
      }
    </Direction>
  );
}

export default Table;
