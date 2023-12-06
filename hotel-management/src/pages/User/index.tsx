// Components
import UserTable from './UserTable';
import Modal from '@src/components/Modal';
import UserForm from './UserForm';

// Styled
import Button from '@src/commons/styles/Button';
import Direction from '@src/commons/styles/Direction';
import { StyledUser, Title } from './styled';

// Constants
import { FORM } from '@src/constants/commons';

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
            <Modal.Window
              name={FORM.USER}
              title={TITLE}
              renderChildren={(onCloseModal) => (
                <UserForm onCloseModal={onCloseModal} />
              )}
            />
          </Modal>
        </Direction>

        <UserTable />
      </StyledUser>
    </>
  );
};

export default User;
