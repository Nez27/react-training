import { useRef } from 'react';

// Components
import Direction from '../../commons/styles/Direction';
import Button from '../../commons/styles/Button.ts';
import UserTable from './Table';

// Styled
import { StyledUser, Title } from './styled';
import UserDialog from './Dialog';

const User = () => {
  const dialogRef = useRef<HTMLDialogElement>();

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

        <UserTable />
      </StyledUser>

      <UserDialog onClose={closeDialog} ref={dialogRef} />
    </>
  );
};

export default User;
