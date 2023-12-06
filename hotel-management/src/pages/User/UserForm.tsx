import { FormProvider, useForm } from 'react-hook-form';

// Hooks
import { useCreateUser } from '@src/hooks/users/useCreateUser';
import { useUpdateUser } from '@src/hooks/users/useUpdateUser';

// Styled
import Input from '@src/commons/styles/Input';

// Components
import Form from '@src/components/Form';

// Helpers
import { isValidRegex } from '@src/helpers/validators';

// Constants
import {
  INVALID_FIELD,
  INVALID_PHONE,
  REQUIRED_FIELD_ERROR,
} from '@src/constants/formValidateMessage';
import { REGEX } from '@src/constants/commons';

// Types
import { IUser } from '@src/types/user';

interface IUserFormProp {
  onCloseModal?: () => void;
  user?: IUser;
}

const UserForm = ({ onCloseModal, user }: IUserFormProp) => {
  const { isCreating, createUser } = useCreateUser();
  const { isUpdating, updateUser } = useUpdateUser();
  const isLoading = isCreating || isUpdating;
  const {id: editId, ...editValues} = {...user};
  
  const formMethods = useForm<IUser>({
    defaultValues: editId 
      ? editValues 
      : {}
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = formMethods;

  // Submit form
  const onSubmit = 
    (newUser: IUser) => {
      if (!user) {
        // Add request
        createUser(newUser, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        });
      } else {
        // Edit request
        newUser.id = editId!;
        updateUser(newUser, {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          }
        });
      }
    };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row label="Full Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkValidName: (value) =>
                  isValidRegex(new RegExp(REGEX.NAME), value) || INVALID_FIELD,
              },
              onChange: () => trigger('name'),
            })}
          />
        </Form.Row>

        <Form.Row label="Phone" error={errors?.phone?.message}>
          <Input
            type="text"
            id="phone"
            {...register('phone', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkPhoneNum: (value) =>
                  isValidRegex(new RegExp(REGEX.PHONE), value) || INVALID_PHONE,
              },
              onChange: () => trigger('phone'),
            })}
          />
        </Form.Row>

        <Form.Action>
          <Form.Button
            type="submit"
            name="submit"
            disabled={!isDirty || !isValid || isLoading}
          >
            {
              !user 
                ? 'Add' 
                : 'Save'
            }
          </Form.Button>
          <Form.Button type="button" variations="secondary" onClick={onCloseModal}>
            Close
          </Form.Button>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
