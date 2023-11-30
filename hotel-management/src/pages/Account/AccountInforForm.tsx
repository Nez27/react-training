import { useForm } from 'react-hook-form';

// Styled
import Input from '@commonStyle/Input';

// Components
import Form from '@component/Form';

// Constants
import { REQUIRED_FIELD_ERROR } from '@constant/formValidateMessage';

// Hooks
import { useUpdateAccount } from '@hook/authentication/useUpdateAccount';
import { useAccount } from '@hook/authentication/useAccount';

interface IAccountForm {
  fullName: string;
}

const AccountInforForm = () => {
  const { account } = useAccount();

  const { updateAccount, isUpdating } = useUpdateAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccountForm>();

  const onSubmit = (data: IAccountForm) => {
    updateAccount(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row label="Email:">
        <Input id="email" readOnly value={account?.email} />
      </Form.Row>

      <Form.Row label="Full Name:" error={errors?.fullName?.message as string}>
        <Input
          id="fullName"
          {...register('fullName', {
            required: REQUIRED_FIELD_ERROR,
            value: account?.user_metadata.fullName,
          })}
        />
      </Form.Row>

      <Form.Action>
        <Form.Button type="submit" name="submit" disabled={isUpdating}>
          Update account
        </Form.Button>
      </Form.Action>
    </Form>
  );
};

export default AccountInforForm;
