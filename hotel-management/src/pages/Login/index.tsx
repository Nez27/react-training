import { Navigate } from 'react-router-dom';

// Styled
import { LoginLayout, StyledLogo, TitleStyled } from './styled';

// Assets
import logo from '@assets/images/logo.png';

// Components
import LoginForm from './LoginForm';

// Hooks
import { useAccount } from '@hook/authentication/useAccount';

const Login = () => {
  const { account } = useAccount();

  if (account) {
    return <Navigate to={'/booking'} />;
  }

  return (
    <LoginLayout>
      <StyledLogo src={logo} />
      <TitleStyled>Log In</TitleStyled>

      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
