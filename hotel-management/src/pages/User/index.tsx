import { useState } from 'react';

// Components
import UserTable from './TableUser';

// Styled
import Button from '@commonStyle/Button';
import Direction from '@commonStyle/Direction.ts';
import { StyledUser, Title } from './styled';

// Types
import Modal from '@component/Modal';
import UserForm from './FormUser';

// Constants
import { FORM } from '@constant/commons';

const User = () => {
  const ADD_ROOM = 'Add room';
  const [reload, setReload] = useState(true);

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
            <Modal.Window name={FORM.USER} title={ADD_ROOM}>
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
