// Components
import Direction from '../commons/direction';
import Button from '../../components/Button';
import { StyledUser, Title } from './styled';
import UserTable from './userTable';

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
