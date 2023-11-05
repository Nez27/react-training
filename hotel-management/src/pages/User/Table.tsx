import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Components
import { RiEditBoxFill } from 'react-icons/ri';
import { IoExit } from 'react-icons/io5';
import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Direction from '../../commons/styles/Direction';
import Message from '../../components/Message';
import Search from '../../components/Search';
import SortBy from '../../components/SortBy';
import OrderBy from '../../components/OrderBy';

// Types
import { Nullable } from '../../types/common';
import { TUser } from '../../types/user';

// Hooks
import { useFetch } from '../../hooks/useFetch';

// Constants
import { STATUS_CODE } from '../../constants/responseStatus';
import { ORDERBY_OPTIONS, USER_PAGE } from '../../constants/variables';
import { CONFIRM_MESSAGE } from '../../constants/messages';

// Styled
import { StyledOperationTable } from './styled';
import Spinner from '../../commons/styles/Spinner';

// Services
import { updateRoomStatus } from '../../services/roomServices';
import { checkOutUser } from '../../services/userServices';

interface IUserRow {
  user: TUser;
  openFormDialog: () => void;
  setUser: Dispatch<SetStateAction<Nullable<TUser>>>;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserRow = ({
  user,
  openFormDialog,
  setUser,
  reload,
  setReload,
}: IUserRow) => {
  const handleEdit = (user: TUser) => {
    setUser(user);
    openFormDialog();
  };

  const handleCheckOut = async (user: TUser) => {
    if (confirm(CONFIRM_MESSAGE)) {
      const resUpdateStatus = await updateRoomStatus(user.roomId, false);
      const resCheckoutUser = await checkOutUser(user);

      if (
        resCheckoutUser?.statusCode === STATUS_CODE.OK &&
        resUpdateStatus?.statusCode === STATUS_CODE.OK
      ) {
        toast.success('Check out complete!');

        // Reload table
        setReload(!reload);
      }
    }
  };

  const { id, name, identifiedCode, phone, roomId } = user;

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{identifiedCode}</div>
      <div>{phone}</div>
      <div>{
        roomId 
          ? roomId 
          : 'None'
      }</div>

      <Menus.Menu>
        <Menus.Toggle id={id.toString()} />

        <Menus.List id={id.toString()}>
          <Menus.Button
            icon={<RiEditBoxFill />}
            onClick={() => handleEdit(user)}
          >
            Edit
          </Menus.Button>
          <Menus.Button icon={<IoExit />} onClick={() => handleCheckOut(user)}>
            Check out
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

interface IUserTable {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  openFormDialog: () => void;
  setUser?: Dispatch<SetStateAction<Nullable<TUser>>>;
}

const UserTable = ({
  reload,
  setReload,
  openFormDialog,
  setUser,
}: IUserTable) => {
  const [users, setUsers] = useState<TUser[]>([]);
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
              <Table.Body<TUser>
                data={users}
                render={(user: TUser) => (
                  <UserRow
                    user={user}
                    key={user.id}
                    reload={reload}
                    setReload={setReload}
                    openFormDialog={openFormDialog}
                    setUser={setUser!}
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
