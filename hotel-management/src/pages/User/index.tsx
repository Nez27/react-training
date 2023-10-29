import { useRef, useState } from 'react';

// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button';
import UserTable from './Table';

// Styled
import { StyledUser, Title } from './styled';
import UserDialog from './Dialog';

const User = () => {
  const dialogRef = useRef<HTMLDialogElement>();
  const [reload, setReload] = useState(true);

  const openDialog = () => {
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
          <Button onClick={openDialog}>Add user</Button>
        </Direction>

        <UserTable reload={reload} />
      </StyledUser>

      <UserDialog
        onClose={closeDialog}
        ref={dialogRef}
        setReload={setReload}
        reload={reload}
      />
    </>
  );
};

export default User;
