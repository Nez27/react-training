import { useState } from 'react';

// Components
import UserTable from './TableUser';

// Styled
import Button from '../../commons/styles/Button';
import Direction from '../../commons/styles/Direction';
import { StyledUser, Title } from './styled';

// Types
import Modal from '../../components/Modal';
import UserForm from './FormUser';

const User = () => {
  const [reload, setReload] = useState(true);

  return (
    <>
      <StyledUser>
        <Direction type="horizontal">
          <Title>List User</Title>

          <Modal>
            <Modal.Open modalName="user-form">
              <Button>Add user</Button>
            </Modal.Open>
            <Modal.Window name="user-form" title="Add form">
              <UserForm setReload={setReload} reload={reload} />
            </Modal.Window>
          </Modal>
        </Direction>

        <UserTable reload={reload} setReload={setReload} />
      </StyledUser>
    </>
  );
};

export default User;
