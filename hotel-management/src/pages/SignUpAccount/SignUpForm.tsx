import { useForm } from 'react-hook-form';
import Form from '@src/components/Form';
import Input from '@src/commons/styles/Input.ts';
import { isValidRegex, isValidString } from '@src/helpers/validators.ts';
import { REGEX } from '@src/constants/commons.ts';
import {
  INVALID_EMAIL,
  INVALID_STRING,
  PASSWORD_CONDITION,
  PASSWORD_NOT_MATCH,
  PASSWORD_NOT_MATCH_REQUIREMENT,
  REQUIRED_FIELD_ERROR,
} from '@src/constants/formValidateMessage.ts';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSignUpAccount } from '@src/hooks/authentication/useSignUpAccount.ts';

interface ISignUpAccountForm {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

const SignUpAccountForm = () => {
  const { createAccount, isCreating } = useSignUpAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ISignUpAccountForm>();

  useEffect(() => {
    if (errors?.password?.message) {
      toast.error(PASSWORD_CONDITION);
    }
  }, [errors?.password?.message]);

  const onSubmit = (data: ISignUpAccountForm) => {
    createAccount({ email: data.email, password: data.password });
    
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row label="Email:" error={errors?.email?.message as string}>
        <Input
          id="email"
          {...register('email', {
            required: REQUIRED_FIELD_ERROR,
            validate: (value) =>
              isValidRegex(REGEX.EMAIL, value) || INVALID_EMAIL,
          })}
        />
      </Form.Row>

      <Form.Row label="Full Name:" error={errors?.fullName?.message as string}>
        <Input
          id="fullName"
          {...register('fullName', {
            required: REQUIRED_FIELD_ERROR,
            validate: (value) => isValidString(value) || INVALID_STRING,
          })}
        />
      </Form.Row>

      <Form.Row label="Password:" error={errors?.password?.message}>
        <Input
          id="password"
          type="password"
          {...register('password', {
            validate: {
              checkPassword: (v) =>
                isValidRegex(REGEX.PASSWORD, v) ||
                PASSWORD_NOT_MATCH_REQUIREMENT,
            },
          })}
        />
      </Form.Row>

      <Form.Row
        label="Confirm Password:"
        error={errors?.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            validate: (value) =>
              getValues().password === value || PASSWORD_NOT_MATCH,
          })}
        />
      </Form.Row>

      <Form.Action>
        <Form.Button type="submit" name="submit" disabled={isCreating}>
          Create Account
        </Form.Button>
      </Form.Action>
    </Form>
  );
};

export default SignUpAccountForm;
