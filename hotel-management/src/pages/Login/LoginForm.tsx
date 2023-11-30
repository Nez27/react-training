import { useForm } from 'react-hook-form';

// Components
import Form from '@component/Form';

// Styled
import { FieldInput, StyledLoginForm } from './styled';
import Button from '@commonStyle/Button';

// Constants
import { REQUIRED_FIELD_ERROR } from '@constant/formValidateMessage';

// Types
import { ILogin } from '@type/common';

// Hooks
import { useLogin } from '@hook/authentication/useLogin';

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
            {...register('email', {
              required: REQUIRED_FIELD_ERROR,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
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
            {...register('password', {
              required: REQUIRED_FIELD_ERROR,
            })}
          />
        </Form.Row>

        <Button type="submit" disabled={isPending}>Login</Button>
      </Form>
    </StyledLoginForm>
  );
};

export default LoginForm;
