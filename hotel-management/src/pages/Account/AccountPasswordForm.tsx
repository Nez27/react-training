import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// Styled
import Input from '@commonStyle/Input';

// Components
import Form from '@component/Form';

// Constants
import { REGEX } from '@constant/commons';
import {
  PASSWORD_CONDITION,
  PASSWORD_NOT_MATCH,
  PASSWORD_NOT_MATCH_REQUIREMENT,
} from '@constant/formValidateMessage';

// Helpers
import { isValidRegex } from '@helper/validators';

// Hooks
import { useUpdateAccount } from '@hook/authentication/useUpdateAccount';

interface IAccountPasswordForm {
  password: string;
  confirmPassword: string;
}

const AccountPasswordForm = () => {
  const { updateAccount, isUpdating } = useUpdateAccount();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IAccountPasswordForm>();

  useEffect(() => {
    if (errors?.password?.message) {
      toast.error(PASSWORD_CONDITION);
    }
  }, [errors?.password?.message]);

  const onSubmit = (data: IAccountPasswordForm) => {
    updateAccount(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Button type="submit" name="submit" disabled={isUpdating}>
          Update password
        </Form.Button>
      </Form.Action>
    </Form>
  );
};

export default AccountPasswordForm;
