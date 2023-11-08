import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

// Hooks
import { useFetch } from '@hook/useFetch';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '@constant/commons';

// Styled
import Direction from '@commonStyle/Direction';
import { StyledOperationTable } from './styled';
import Spinner from '@commonStyle/Spinner';

interface IUserTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserTable = ({ reload, setReload }: IUserTable) => {
  const columnName = ['Id', 'Name', 'Identified Code', 'Phone', 'Room Id'];
  const [users, setUsers] = useState<IUser[]>([]);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [searchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy')
    ? searchParams.get('sortBy')!
    : '';
  const orderByValue = searchParams.get('orderBy')
    ? searchParams.get('orderBy')!
    : '';

  const { data, isPending, errorFetchMsg } = useFetch(
    'users',
    'phone',
    phoneSearch,
    sortByValue,
    orderByValue,
    reload
  );

  useEffect(() => {
    if (data) {
      setUsers(data);
    } else {
      setUsers([]);
    }

    if (errorFetchMsg) {
      console.error(errorFetchMsg);
    }
  }, [data, errorFetchMsg, setUsers]);

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

        {isPending && <Spinner />}

        {users.length ? (
          <Menus>
            <Table columns="10% 30% 20% 20% 10% 5%">
              <Table.Header headerColumn={columnName} />
              <Table.Body<IUser>
                data={users}
                render={(user: IUser) => (
                  <UserRow
                    user={user}
                    key={user.id}
                    reload={reload}
                    setReload={setReload}
                  />
                )}
              />
            </Table>
          </Menus>
        ) : (
          !isPending && <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default UserTable;
