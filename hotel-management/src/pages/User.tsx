import styled from 'styled-components';
import Direction from '../ui/Direction';
import Button from '../ui/Button';
import Table from '../ui/Table';
// import UserModal from '../models/User';

const StyledUser = styled.main`
  padding: 50px;

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

// const UserRow = ({ user }: { user: UserModal }) => {
//   return (
//     <Table.Row>
//       <div>{user.id}</div>
//       <div>{user.name}</div>
//       <div>{user.identifiedCode}</div>
//       <div>{user.phone}</div>
//       <div>{user.roomId}</div>
//       <div>{user.address}</div>
//     </Table.Row>
//   );
// };

const User = () => {
  return (
    <StyledUser>
      <Direction type="horizontal">
        <Title>List User</Title>
        <Button>Add user</Button>
      </Direction>

      <Direction>
        <StyledOperationTable>
          <p>Sort / Filter table</p>
        </StyledOperationTable>
        <Table columns="100px 400px 200px 200px 100px 1fr 100px">
          <Table.Header>
            <div>Id</div>
            <div>Name</div>
            <div>Identified Code</div>
            <div>Phone</div>
            <div>Room</div>
            <div>Address</div>
            <div></div>
          </Table.Header>
          {/* <Table.Body data<T,>={data} /> */}
        </Table>
      </Direction>
    </StyledUser>
  );
};

export default User;
