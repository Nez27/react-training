import { useRef, useState } from 'react';

// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import UserTable from './Table';

// Styled
import { StyledUser, Title } from './styled';
import UserDialog from './Dialog';

// Types
import { TUser } from '../../globals/types';

const User = () => {
  const dialogRef = useRef<HTMLDialogElement>();
  const [reload, setReload] = useState(true);
  const [user, setUser] = useState<TUser | null>(null);
  const [isAdd, setIsAdd] = useState(false);

  const openFormDialog = (isAddForm: boolean = false) => {
    setIsAdd(isAddForm);
    dialogRef.current?.showModal();
  };

  const closeFormDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <StyledUser>
        <Direction type="horizontal">
          <Title>List User</Title>
          <Button onClick={() => openFormDialog(true)}>Add user</Button>
        </Direction>

        <UserTable
          reload={reload}
          setReload={setReload}
          openFormDialog={() => openFormDialog()}
          setUser={setUser}
        />
      </StyledUser>

      <UserDialog
        onClose={closeFormDialog}
        ref={dialogRef}
        setReload={setReload}
        reload={reload}
        user={user}
        isAdd={isAdd}
      />
    </>
  );
};

export default User;
