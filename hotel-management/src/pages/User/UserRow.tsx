import { useCallback } from 'react';

// Components
import { RiEditBoxFill } from 'react-icons/ri';
import Modal from '@src/components/Modal';
import Table from '@src/components/Table';
import Menus from '@src/components/Menus';
import UserForm from './UserForm';
import ConfirmMessage from '@src/components/ConfirmMessage';
import { HiTrash } from 'react-icons/hi';

// Types
import { IUser } from '@src/types/user';

// Constants
import { FORM } from '@src/constants/commons';

// Hooks
import { useIsDeleteUser } from '@src/hooks/users/useSetIsDeleteUser';

interface IUserRow {
  user: IUser;
}

const UserRow = ({ user }: IUserRow) => {
  const { id, name, phone, isBooked } = user;
  const { setIsDeleteUser } = useIsDeleteUser();

  const renderEditBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        onClick={onOpenModal}
        icon={<RiEditBoxFill />}
        label={'Edit'}
      />
    ),
    []
  );

  const renderDeleteBtn = useCallback(
    (onOpenModal: () => void) => (
      <Menus.Button
        icon={<HiTrash />}
        onClick={onOpenModal}
        disabled={isBooked}
        label={'Delete'}
      />
    ),
    [isBooked]
  );

  const renderRow = useCallback(
    (onCloseModal: () => void) => (
      <UserForm user={user} onCloseModal={onCloseModal} />
    ),
    [user]
  );

  const renderConfirmMessage = useCallback(
    (onCloseModal: () => void) => (
      <ConfirmMessage
        message={`Are you sure to delete ${name}?`}
        onConfirm={() => setIsDeleteUser(id)}
        onCloseModal={onCloseModal}
      />
    ),
    [id, name, setIsDeleteUser]
  );

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{phone}</div>
      <div>{isBooked ? 'Yes' : 'No'}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id.toString()} />

            <Menus.List id={id.toString()}>
              <Modal.Open
                modalName={FORM.EDIT}
                renderChildren={renderEditBtn}
              />

              <Modal.Open
                modalName={FORM.DELETE}
                renderChildren={renderDeleteBtn}
              />
            </Menus.List>

            <Modal.Window
              name={FORM.EDIT}
              title="Edit user"
              renderChildren={renderRow}
            />

            <Modal.Window
              name={FORM.DELETE}
              title="Delete User"
              renderChildren={renderConfirmMessage}
            />
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default UserRow;
