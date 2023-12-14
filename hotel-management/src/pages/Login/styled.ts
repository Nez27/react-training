import styled from 'styled-components';

// Styled
import CommonInput from '@src/commons/styles/CommonInput';

const LoginLayout = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-login);
`;

const StyledLogo = styled.img`
  width: 250px;
  height: 250px;
`;

const TitleStyled = styled.h1`
  font-size: var(--fs-md);
`;

const StyledLoginForm = styled.div`
  background-color: var(--form-color);

  border-radius: var(--radius-sm);

  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 20px;
  padding: 30px 50px;
`;

const FieldInput = styled.input`
  ${CommonInput}

  width: 300px;
`

export {
  LoginLayout,
  StyledLogo,
  TitleStyled,
  StyledLoginForm,
  FieldInput
};
