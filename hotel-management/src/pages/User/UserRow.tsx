import { useCallback } from 'react';

// Components
import { RiEditBoxFill } from 'react-icons/ri';
import Modal from '@component/Modal';
import Table from '@component/Table';
import Menus from '@component/Menus';
import UserForm from './UserForm';
import ConfirmMessage from '@component/ConfirmMessage';
import { HiTrash } from 'react-icons/hi';

// Types
import { IUser } from '@type/user';

// Constants
import { FORM } from '@constant/commons';

// Hooks
import { useIsDeleteUser } from '@hook/users/useSetIsDeleteUser';

interface IUserRow {
  user: IUser;
}

const UserRow = ({ user }: IUserRow) => {
  const {
    id,
    name,
    phone,
    isBooked
  } = user;
  const { setIsDeleteUser } = useIsDeleteUser();

  const renderEditBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button onClick={onCloseModal} icon={<RiEditBoxFill />}>
        Edit
      </Menus.Button>
    ),
    []
  );

  const renderDeleteBtn = useCallback(
    (onCloseModal: () => void) => (
      <Menus.Button icon={<HiTrash />} onClick={onCloseModal} disabled={isBooked}>
        Delete
      </Menus.Button>
    ),
    [isBooked]
  );
  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{phone}</div>
      <div>{
        isBooked 
          ? 'Yes' 
          : 'No'
          }</div>
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

            <Modal.Window name={FORM.EDIT} title="Edit user">
              <UserForm user={user} />
            </Modal.Window>

            <Modal.Window name={FORM.DELETE} title="Delete User">
              <ConfirmMessage
                message={`Are you sure to delete ${name}?`}
                onConfirm={() => setIsDeleteUser(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default UserRow;
