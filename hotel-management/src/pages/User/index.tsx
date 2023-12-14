// Components
import UserForm from './UserForm';
import Modal from '@src/components/Modal';
import ButtonIcon from '@src/components/ButtonIcon';
import Direction from '@src/commons/styles/Direction';
import {FiEdit} from 'react-icons/fi';
import {FaRegTrashAlt} from 'react-icons/fa';
import {MdOutlineAddCircleOutline} from 'react-icons/md';
import Table from '@src/components/Table';

// Styled
import {ActionTable, StyledUser, Title} from './styled';
import Spinner from '@src/commons/styles/Spinner.ts';

// Types
import {ColumnProps} from '@src/types/common.ts';
import {IUser} from '@src/types/user.ts';

// Hooks
import {useUsers} from '@src/hooks/users/useUsers.ts';
import {useEffect, useState} from 'react';
import {FORM, USER_PAGE} from '@src/constants/commons.ts';
import {findItemInListById} from '@src/helpers/helper.ts';
import ConfirmMessage from '@src/components/ConfirmMessage';
import {useIsDeleteUser} from '@src/hooks/users/useSetIsDeleteUser.ts';
import Message from "@src/components/Message";

interface IUserTable extends Omit<IUser, 'isBooked'> {
  isBooked: string;
}

const User = () => {
  const {setIsDeleteUser} = useIsDeleteUser();
  const [itemSelected, setItemSelected] = useState<IUserTable>();
  let userSelected: IUser | undefined;

  const columns: ColumnProps[] = [
    {
      key: 'id',
      title: 'Id',
      width: 10
    },
    {
      key: 'name',
      title: 'Name',
      width: 40
    },
    {
      key: 'phone',
      title: 'Phone',
      width: 20
    },
    {
      key: 'isBooked',
      title: 'Is Booked',
      width: 20
    }
  ];
  const {isLoading, users, count} = useUsers();

  // Reset value when users changed.
  useEffect(() => {
    setItemSelected(undefined);
  }, [users]);

  const tempUsers = users?.map((user) => (
    {
      ...user,
      isBooked: user.isBooked
        ? 'Yes'
        : 'No'
    }
  ));

  if (itemSelected && users) {
    userSelected = findItemInListById<IUser>(itemSelected.id, users);
  }

  return (
    <StyledUser>
      <Direction type="horizontal">
        <Title>List User</Title>

        <Modal>
          <ActionTable>
            <Modal.Open
              modalName={FORM.ROOM}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<MdOutlineAddCircleOutline/>}
                  text={'Add User'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'primary'}
                  iconColor={'white'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.EDIT}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<FiEdit/>}
                  text={'Edit'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'success'}
                  iconColor={'white'}
                  disabled={!itemSelected}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Open
              modalName={FORM.DELETE}
              renderChildren={(onCloseModal) => (
                <ButtonIcon
                  icon={<FaRegTrashAlt/>}
                  text={'Delete'}
                  iconSize={'18px'}
                  fontSize={'var(--fs-sm)'}
                  variations={'danger'}
                  iconColor={'white'}
                  disabled={!itemSelected || itemSelected?.isBooked === 'Yes'}
                  onClick={onCloseModal}
                />
              )}
            />

            <Modal.Window
              name={FORM.ROOM}
              title="Add form"
              renderChildren={(onCloseModal) => (
                <UserForm onCloseModal={onCloseModal}/>
              )}
            />

            <Modal.Window
              name={FORM.EDIT}
              title="Edit User"
              renderChildren={(onCloseModal) =>
                <UserForm user={userSelected} onCloseModal={onCloseModal}/>
              }/>

            <Modal.Window
              name={FORM.DELETE}
              title="Delete User"
              renderChildren={(onCloseModal) =>
                <ConfirmMessage
                  message={`Are you sure to delete ${userSelected!.name}?`}
                  onConfirm={() => setIsDeleteUser(userSelected!.id)}
                  onCloseModal={onCloseModal}
                />
              }/>

          </ActionTable>
        </Modal>
      </Direction>

      {isLoading && <Spinner/>}

      {
        tempUsers &&
        Boolean(tempUsers.length) &&
        <Table<IUserTable>
          columns={columns}
          rows={tempUsers}
          count={count}
          sortBy={USER_PAGE.SORTBY_OPTIONS}
          enabledOrder={true}
          searchPlaceHolder={'Search by phone...'}
          stateSelected={{
            itemSelected,
            setItemSelected
          }}
          onRowClick={(data) => {
            setItemSelected(data);
          }}/>
      }

      {tempUsers && Boolean(!tempUsers.length) && <Message>No data to show here!</Message>}
    </StyledUser>
  );
};

export default User;
