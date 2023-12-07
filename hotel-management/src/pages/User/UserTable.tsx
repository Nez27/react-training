// Components
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';
import SortBy from '@src/components/SortBy';
import OrderBy from '@src/components/OrderBy';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '@src/constants/commons';

// Styled
import Direction from '@src/commons/styles/Direction';
import { StyledOperationTable } from './styled';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useUsers } from '@src/hooks/users/useUsers';
import { ColumnProps } from '@src/types/common';
import { IUser } from '@src/types/user';

interface IUserTable extends Omit<IUser, 'isBooked'>{
  isBooked: string;
  onClick: () => void;
}

const UserTable = () => {
  const columns: ColumnProps[] = [
    {
      key: 'id',
      title: 'Id',
      width: 10,
    },
    {
      key: 'name',
      title: 'Name',
      width: 35,
    },
    {
      key: 'phone',
      title: 'Phone',
      width: 30,
    },
    {
      key: 'isBooked',
      title: 'Is Booked',
      width: 20,
    },
  ];
  const { isLoading, users, count } = useUsers();

  const tempUsers = users?.map((user) => ({
    ...user,
    isBooked: user.isBooked 
      ? 'Yes' 
      : 'No',
    onClick: () => console.log(user),
  }));

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={USER_PAGE.SORTBY_OPTIONS} />
          <Search setPlaceHolder="Search by phone..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {tempUsers && tempUsers.length ? (
          <Table<IUserTable> columns={columns} rows={tempUsers} count={count}/>
        ) : (
          !isLoading && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default UserTable;
