// Components
import UserTable from './UserTable';
import Modal from '@component/Modal';
import UserForm from './UserForm';

// Styled
import Button from '@commonStyle/Button';
import Direction from '@commonStyle/Direction.ts';
import { StyledUser, Title } from './styled';

// Constants
import { FORM } from '@constant/commons';

const User = () => {
  const TITLE = 'Add user';

  return (
    <>
      <StyledUser>
        <Direction type="horizontal">
          <Title>List User</Title>

          <Modal>
            <Modal.Open
              modalName={FORM.USER}
              renderChildren={(onCloseModal) => (
                <Button onClick={onCloseModal}>Add user</Button>
              )}
            />
            <Modal.Window name={FORM.USER} title={TITLE}>
              <UserForm />
            </Modal.Window>
          </Modal>
        </Direction>

        <UserTable />
      </StyledUser>
    </>
  );
};

export default User;
