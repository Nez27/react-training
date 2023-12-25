import { useForm } from 'react-hook-form';

// Components
import Form from '@src/components/Form';

// Styled
import { FieldInput, StyledLoginForm } from './styled';
import Button from '@src/commons/styles/Button';

// Constants
import {
  INVALID_EMAIL,
  REQUIRED_FIELD_ERROR,
} from '@src/constants/formValidateMessage';

// Types
import { ILogin } from '@src/types/common';

// Hooks
import { useLogin } from '@src/hooks/authentication/useLogin';

// Helpers
import { isValidRegex } from '@src/helpers/validators';

// Constants
import { REGEX } from '@src/constants/commons';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: {
      email: 'admin@nezumi.site',
      password: 'Phanhuuloi2@@1',
    }
  });
  const { login, isPending } = useLogin();

  const onSubmit = (data: ILogin) => {
    login(data);
  };

  return (
    <StyledLoginForm>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row
          label="Email:"
          direction="vertical"
          error={errors.email?.message}
        >
          <FieldInput
            type="text"
            id="email"
            {...register('email', {
              required: REQUIRED_FIELD_ERROR,
              validate: (value) =>
                isValidRegex(REGEX.EMAIL, value) || INVALID_EMAIL,
            })}
          />
        </Form.Row>
        <Form.Row
          label="Password:"
          direction="vertical"
          error={errors.password?.message}
        >
          <FieldInput
            type="password"
            id="password"
            {...register('password', {
              required: REQUIRED_FIELD_ERROR,
            })}
          />
        </Form.Row>

        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </Form>
    </StyledLoginForm>
  );
};

export default LoginForm;
