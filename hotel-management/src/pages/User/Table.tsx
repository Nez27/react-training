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

// Styled
import Spinner from '../../commons/styles/Spinner';

type TUserModal = { user: TUser };

const UserRow = ({ user }: TUserModal) => {
  const handleOnClick = (id: string) => {
    alert(`Id: ${id}`);
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
            onClick={() => handleOnClick(id)}
          >
            Edit
          </Menus.Button>
          <Menus.Button icon={<HiTrash />} onClick={() => handleOnClick(id)}>
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

const UserTable = () => {
  const { data, isPending, errorMsg } = useFetch('users');
  let users: TUser[] = [];

  if (data) users = data;

  if (isPending) return <Spinner />;

  if (errorMsg) console.error(errorMsg);

  return users.length ? (
    <Direction>
      <StyledOperationTable>
        <p>Sort / Search table</p>
      </StyledOperationTable>

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
            render={(user: TUser) => <UserRow user={user} key={user.id} />}
          />
        </Table>
      </Menus>
    </Direction>
  ) : (
    <Message>No data to show here!</Message>
  );
};

export default UserTable;
