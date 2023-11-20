// Components
import { RiEditBoxFill } from 'react-icons/ri';
import Modal from '@component/Modal';
import Table from '@component/Table';
import Menus from '@component/Menus';
import UserForm from './UserForm';


// Types
import { IUser } from '@type/users';

interface IUserRow {
  user: IUser;
}

const UserRow = ({ user }: IUserRow) => {
  const { id, name, phone, isBooked } = user;

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
                modalName="edit"
                renderChildren={(onCloseModal) => (
                  <Menus.Button onClick={onCloseModal} icon={<RiEditBoxFill />}>
                    Edit
                  </Menus.Button>
                )}
              />
            </Menus.List>

            <Modal.Window name="edit" title="Edit user">
              <UserForm user={user} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default UserRow;
