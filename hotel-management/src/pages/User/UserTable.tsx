// Components
import { HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';
import { StyledOperationTable } from './styled';
import Menus from '../../components/Menus/Menus';
import Table from '../../components/Table';
import Direction from '../../commons/styles/Direction';
import Empty from '../../components/Message';

// Types
import { TUser } from '../../globals/types';

// Constants
import { sampleData } from '../../constants/sampleData';

type TUserModal = { user: TUser };

const UserRow = ({ user }: TUserModal) => {
  const handleOnClick = (id: string) => {
    alert(`Id: ${id}`);
  };

  return (
    <Table.Row>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.identifiedCode}</div>
      <div>{user.phone}</div>
      <div>{user.roomId}</div>

      <Menus.Menu>
        <Menus.Toggle id={user.id} />

        <Menus.List id={user.id}>
          <Menus.Button
            icon={<HiSquare2Stack />}
            onClick={() => handleOnClick(user.id)}
          >
            Edit
          </Menus.Button>
          <Menus.Button
            icon={<HiTrash />}
            onClick={() => handleOnClick(user.id)}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

const UserTable = () => {
  return sampleData.length > 0 ? (
    <Direction>
      <StyledOperationTable>
        <p>Sort / Filter / Search table</p>
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
            data={sampleData}
            render={(user: TUser) => <UserRow user={user} key={user.id} />}
          />
        </Table>
      </Menus>
    </Direction>
  ) : (
    <Empty>No data to show here!</Empty>
  );
};

export default UserTable;
