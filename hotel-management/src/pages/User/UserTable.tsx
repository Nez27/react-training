import { useCallback } from 'react';

// Components
import Menus from '@src/components/Menus';
import Table from '@src/components/Table';
import Message from '@src/components/Message';
import Search from '@src/components/Search';
import SortBy from '@src/components/SortBy';
import OrderBy from '@src/components/OrderBy';
import UserRow from './UserRow';
import Pagination from '@src/components/Pagination';

// Types
import { IUser } from '@src/types/user';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '@src/constants/commons';

// Styled
import Direction from '@src/commons/styles/Direction';
import { StyledOperationTable } from './styled';
import Spinner from '@src/commons/styles/Spinner';

// Hooks
import { useUsers } from '@src/hooks/users/useUsers';

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
