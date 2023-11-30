// Styled
import { FormArea, StyledAccount, SubTitle, Title } from './styled';

// Components
import AccountInforForm from './AccountInforForm';
import AccountPasswordForm from './AccountPasswordForm';

const Account = () => {
  return (
    <StyledAccount>
      <Title>Update account</Title>

      <FormArea>
        <SubTitle>Update information</SubTitle>
        <AccountInforForm />
      </FormArea>

      <FormArea>
        <SubTitle>Update password</SubTitle>
        <AccountPasswordForm />
      </FormArea>
    </StyledAccount>
  );
};

export default Account;
