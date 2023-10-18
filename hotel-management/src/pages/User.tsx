import styled from 'styled-components';
import Direction from '../ui/Direction';
import Button from '../ui/Button';
import Table from '../ui/Table';

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
        <Table columns="1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>Head 1</div>
            <div>Head 2</div>
            <div>Head 3</div>
            <div>Head 4</div>
          </Table.Header>
        </Table>
      </Direction>
    </StyledUser>
  );
};

export default User;
