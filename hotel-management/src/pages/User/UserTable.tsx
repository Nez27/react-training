import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

// Components
import Menus from '@component/Menus';
import Table from '@component/Table';
import Message from '@component/Message';
import Search from '@component/Search';
import SortBy from '@component/SortBy';
import OrderBy from '@component/OrderBy';
import UserRow from './UserRow';

// Types
import { IUser } from '@type/users';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '@constant/commons';

// Styled
import Direction from '@commonStyle/Direction';
import { StyledOperationTable } from './styled';
import Spinner from '@commonStyle/Spinner';

import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@service/userServices';
import toast from 'react-hot-toast';

interface IUserTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserTable = ({ reload, setReload }: IUserTable) => {
  const columnName = ['Id', 'Name', 'Phone'];

  const [phoneSearch, setPhoneSearch] = useState('');
  const [searchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy')
    ? searchParams.get('sortBy')!
    : 'id';
  const orderByValue = searchParams.get('orderBy')
    ? searchParams.get('orderBy')!
    : 'asc';

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['cabins', sortByValue, orderByValue, phoneSearch],
    queryFn: () => getAllUsers(sortByValue, orderByValue, phoneSearch),
  });

  if(error) {
    toast.error(error.message);
  }

  const renderUserRow = useCallback(
    (user: IUser) => (
      <UserRow
        user={user}
        key={user.id}
        reload={reload}
        setReload={setReload}
      />
    ),
    [reload, setReload]
  );

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <OrderBy options={ORDERBY_OPTIONS} />

          <SortBy options={USER_PAGE.SORTBY_OPTIONS} />
          <Search
            setValueSearch={setPhoneSearch}
            setPlaceHolder="Search by phone..."
          />
        </StyledOperationTable>

        {isLoading && <Spinner />}

        {users && users.length ? (
          <Menus>
            <Table columns="10% 40% 35% 15%">
              <Table.Header headerColumn={columnName} />
              <Table.Body<IUser> data={users} render={renderUserRow} />
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
