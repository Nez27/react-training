// Hooks
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateUser } from '@hook/users/useCreateUser.ts';
import { useUpdateUser } from '@hook/users/useUpdateUser.ts';

// Styled
import Input from '@commonStyle/Input.ts';

// Components
import Form from '@component/Form/index.tsx';

// Helpers
import { isValidRegex } from '@helper/validators.ts';

import {
  INVALID_FIELD,
  INVALID_PHONE,
  REQUIRED_FIELD_ERROR,
} from '@constant/formValidateMessage.ts';
import { REGEX } from '@constant/commons.ts';

// Styled
import { FormBtn } from './styled.ts';

// Types
import { IUser } from '@type/users.ts';

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
                checkPhoneNum: (v) =>
                  isValidRegex(new RegExp(REGEX.PHONE), v) || INVALID_PHONE,
              },
              onChange: () => trigger('phone'),
            })}
          />
        </Form.Row>

        <Form.Action>
          <FormBtn
            type="submit"
            name="submit"
            disabled={!isDirty || !isValid || isLoading}
          >
            {
              !user 
                ? 'Add' 
                : 'Save'
            }
          </FormBtn>
          <FormBtn type="button" variations="secondary" onClick={onCloseModal}>
            Close
          </FormBtn>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
