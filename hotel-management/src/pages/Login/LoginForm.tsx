import { useForm } from 'react-hook-form';

// Components
import Form from '@component/Form';

// Styled
import { FieldInput, StyledLoginForm } from './styled';
import Button from '@commonStyle/Button';

// Constants
import {
  INVALID_EMAIL,
  REQUIRED_FIELD_ERROR,
} from '@constant/formValidateMessage';

// Types
import { ILogin } from '@type/common';

// Hooks
import { useLogin } from '@hook/authentication/useLogin';

// Helpers
import { isValidRegex } from '@helper/validators';

// Constants
import { REGEX } from '@constant/commons';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
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
