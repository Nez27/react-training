import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Components
import { HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';
import { StyledOperationTable } from './styled';
import Menus from '../../components/Menus/Menus';
import Table from '../../components/Table';
import Direction from '../../commons/styles/Direction';
import Message from '../../components/Message';

// Types
import { TUser } from '../../globals/types';

// Constants
import { useFetch } from '../../hooks/useFetch';
import { USER_PATH } from '../../constants/path';
import { STATUS_CODE } from '../../constants/statusCode';
import { CONFIRM_DELETE, DELETE_SUCCESS } from '../../constants/messages';

// Styled
import Spinner from '../../commons/styles/Spinner';

// Utils
import { sendRequest } from '../../helpers/sendRequest';
import Search from '../../components/Search';

interface IUserRow {
  user: TUser;
  openFormDialog: () => void;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserRow = ({
  user,
  openFormDialog,
  setUser,
  reload,
  setReload,
}: IUserRow) => {
  const handleOnEdit = (user: TUser) => {
    setUser(user);
    openFormDialog();
  };

  const handleOnDelete = async (user: TUser) => {
    if (confirm(CONFIRM_DELETE)) {
      const response = await sendRequest(
        USER_PATH + `/${user.id}`,
        null,
        'DELETE',
      );

      if (response.statusCode === STATUS_CODE.OK) {
        toast.success(DELETE_SUCCESS);

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
      <div>{roomId}</div>

      <Menus.Menu>
        <Menus.Toggle id={id} />

        <Menus.List id={id}>
          <Menus.Button
            icon={<HiSquare2Stack />}
            onClick={() => handleOnEdit(user)}
          >
            Edit
          </Menus.Button>
          <Menus.Button icon={<HiTrash />} onClick={() => handleOnDelete(user)}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

interface IUserTable {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  openFormDialog: () => void;
  setUser?: React.Dispatch<React.SetStateAction<TUser | null>>;
}

const UserTable = ({
  reload,
  setReload,
  openFormDialog,
  setUser,
}: IUserTable) => {
  const [keyPhone, setKeyPhone] = useState('');
  const { data, isPending, errorMsg } = useFetch('users', keyPhone, reload);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    } else {
      setUsers([]);
    }

    if (errorMsg) {
      console.error(errorMsg);
    }
  }, [data, errorMsg]);

  return (
    <>
      <Direction>
        <StyledOperationTable>
          <Search setKeyPhone={setKeyPhone} />
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
                <div>Room</div>
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
          <Message>No data to show here!</Message>
        )}
      </Direction>
    </>
  );
};

export default UserTable;
