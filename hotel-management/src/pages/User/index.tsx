// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import UserTable from './userTable';

// Styled
import { StyledUser, Title } from './styled';

const User = () => {
  return (
    <StyledUser>
      <Direction type="horizontal">
        <Title>List User</Title>
        <Button>Add user</Button>
      </Direction>

      <UserTable />
    </StyledUser>
  );
};

export default User;
