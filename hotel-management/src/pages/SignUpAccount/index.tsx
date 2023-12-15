import {FormArea, StyledSignUpAccount, Title} from "@src/pages/SignUpAccount/styled.ts";
import SignUpForm from "@src/pages/SignUpAccount/SignUpForm.tsx";


const SignUpAccount = () => {
  return (
    <StyledSignUpAccount>
      <Title>Create account</Title>

      <FormArea>
        <SignUpForm />
      </FormArea>

    </StyledSignUpAccount>
  );
}

export default SignUpAccount;
