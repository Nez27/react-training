import toast from 'react-hot-toast';
import { Dispatch, SetStateAction } from 'react';

// Components
import { RiEditBoxFill } from 'react-icons/ri';
import { IoExit } from 'react-icons/io5';
import Modal from '@component/Modal';
import Table from '@component/Table';
import Menus from '@component/Menus';
import UserForm from './FormUser';

// Constants
import { STATUS_CODE } from '@constant/responseStatus';
import { CONFIRM_MESSAGE, DENIED_ACTION } from '@constant/messages';

// Services
import { updateRoomStatus } from '@service/roomServices';
import { checkOutUser } from '@service/userServices';

// Types
import { IUser } from '@type/users';

interface IUserRow {
  user: IUser;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const UserRow = ({ user, reload, setReload }: IUserRow) => {
  const handleCheckOut = async (user: IUser) => {
    if (user.roomId !== 0) {
      if (confirm(CONFIRM_MESSAGE)) {
        const resUpdateStatus = await updateRoomStatus(user.roomId, false);
        const resCheckoutUser = await checkOutUser(user);

        if (
          resCheckoutUser?.statusCode === STATUS_CODE.OK &&
          resUpdateStatus?.statusCode === STATUS_CODE.OK
        ) {
          toast.success('Check out complete!');

          // Reload table
          setReload(!reload);
        }
      }
    } else {
      toast.error(DENIED_ACTION);
    }
  };

  const { id, name, identifiedCode, phone, roomId } = user;

  return (
    <Table.Row>
      <div>{id}</div>
      <div>{name}</div>
      <div>{identifiedCode}</div>
      <div>{phone}</div>
      <div>
        {
          roomId 
            ? roomId 
            : 'None'
        }
      </div>
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
              <Menus.Button
                icon={<IoExit />}
                onClick={() => handleCheckOut(user)}
              >
                Check out
              </Menus.Button>
            </Menus.List>

            <Modal.Window name="edit" title="Edit user">
              <UserForm user={user} setReload={setReload} reload={reload} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default UserRow;
