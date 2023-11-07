import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// Components
import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Direction from '../../commons/styles/Direction';
import Message from '../../components/Message';
import Search from '../../components/Search';
import SortBy from '../../components/SortBy';
import OrderBy from '../../components/OrderBy';

// Types
import { IUser } from '../../types/users';

// Hooks
import { useFetch } from '../../hooks/useFetch';

// Constants
import { ORDERBY_OPTIONS, USER_PAGE } from '../../constants/variables';

// Styled
import { StyledOperationTable } from './styled';
import Spinner from '../../commons/styles/Spinner';
import UserRow from './UserRow';





interface IUserTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserTable = ({ reload, setReload }: IUserTable) => {
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
              <Table.Header>
                <div>Id</div>
                <div>Name</div>
                <div>Identified Code</div>
                <div>Phone</div>
                <div>Room Id</div>
              </Table.Header>
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
