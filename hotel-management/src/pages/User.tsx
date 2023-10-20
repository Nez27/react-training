import styled from 'styled-components';
import { HiSquare2Stack } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi';

// Components
import Direction from '../ui/Direction';
import Button from '../ui/Button';
import Table from '../ui/Table';
import Empty from '../ui/Empty';
import Menus from '../ui/Menus';

// Models
import UserModel from '../models/User';
import { sampleData } from '../constants/sampleData';

const StyledUser = styled.main`
  padding: 20px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: var(--fs-md);
  color: var(--dark-text);
  text-transform: capitalize;
`;

const StyledOperationTable = styled.div`
  text-align: right;
`;

const UserRow = ({ user }: { user: UserModel }) => {
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
            onClick={() => alert(`Id: ${user.id}`)}
          >
            Edit
          </Menus.Button>
          <Menus.Button
            icon={<HiTrash />}
            onClick={() => alert(`Id: ${user.id}`)}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

const User = () => {
  return (
    <StyledUser>
      <Direction type="horizontal">
        <Title>List User</Title>
        <Button>Add user</Button>
      </Direction>

      {sampleData.length > 0 ? (
        <Direction>
          <StyledOperationTable>
            <p>Sort / Filter / Search table</p>
          </StyledOperationTable>

          <Menus>
            <Table $columns="10% 30% 20% 20% 10% 5%">
              <Table.Header>
                <div>Id</div>
                <div>Name</div>
                <div>Identified Code</div>
                <div>Phone</div>
                <div>Room</div>
              </Table.Header>
              <Table.Body<UserModel>
                data={sampleData}
                render={(user: UserModel) => (
                  <UserRow user={user} key={user.id} />
                )}
              />
            </Table>
          </Menus>
        </Direction>
      ) : (
        <Empty>No data to show here!</Empty>
      )}
    </StyledUser>
  );
};

export default User;
