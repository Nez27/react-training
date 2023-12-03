import { useCallback } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import SortBy from '@component/SortBy';
import OrderBy from '@component/OrderBy';
import UserRow from './UserRow';
import Pagination from '@component/Pagination';

// Types
import { IUser } from '@type/user';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '@constant/commons';

// Styled
import Direction from '@commonStyle/Direction';
import { StyledOperationTable } from './styled';
import Spinner from '@commonStyle/Spinner';

// Hooks
import { useUsers } from '@hook/users/useUsers';

const UserTable = () => {
  const columnName = [
    'Id',
    'Name',
    'Phone',
    'Is Booked'
  ];
  const {
    isLoading,
    users,
    count
  } = useUsers();

  const renderUserRow = useCallback(
    (user: IUser) => (
      <UserRow
        user={user}
        key={user.id}
      />
    ),
    []
  );

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={USER_PAGE.SORTBY_OPTIONS} />
          <Search setPlaceHolder="Search by phone..." />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {users && users.length ? (
          <Menus>
            <Table columns="10% 35% 30% 15% 5%">
              <Table.Header headerColumn={columnName} />
              <Table.Body<IUser> data={users} render={renderUserRow} />
              <Table.Footer>
                <Pagination count={count!}/>
              </Table.Footer>
            </Table>
          </Menus>
        ) : (
          !isLoading && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default UserTable;
