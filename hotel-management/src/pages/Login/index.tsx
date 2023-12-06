import { Navigate } from 'react-router-dom';

// Styled
import { LoginLayout, StyledLogo, TitleStyled } from './styled';

// Components
import LoginForm from './LoginForm';

// Hooks
import { useAccount } from '@src/hooks/authentication/useAccount';

const Login = () => {
  const { account } = useAccount();

  if (account) {
    return <Navigate to={'/booking'} />;
  }

  return (
    <LoginLayout>
      <StyledLogo src={'./assets/images/logo.png'} alt='Logo Web' />
      <TitleStyled>Log In</TitleStyled>

      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
