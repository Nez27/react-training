import { useRef, useState } from 'react';

// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import UserTable from './Table';

// Styled
import { StyledUser, Title } from './styled';
import UserDialog from './Dialog';
import { TUser } from '../../globals/types';

const User = () => {
  const dialogRef = useRef<HTMLDialogElement>();
  const [reload, setReload] = useState(true);
  const [user, setUser] = useState<TUser | null>(null);
  const [isAdd, setIsAdd] = useState(false);

  const openDialog = (isAdd: boolean) => {
    setIsAdd(isAdd);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <StyledUser>
        <Direction type="horizontal">
          <Title>List User</Title>
          <Button onClick={() => openDialog(true)}>Add user</Button>
        </Direction>

        <UserTable
          reload={reload}
          setReload={setReload}
          openFormDialog={() => openDialog(false)}
          setUser={setUser}
        />
      </StyledUser>

      <UserDialog
        onClose={closeDialog}
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
