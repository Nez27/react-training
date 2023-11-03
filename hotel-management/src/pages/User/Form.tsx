import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';

// Styled
import Input from '../../commons/styles/Input';
import TextArea from '../../commons/styles/TextArea';

// Components
import Form from '../../components/Form';
import FormRow from '../../components/LabelControl/index.tsx';

// Types
import { TKeyValue, TUser } from '../../globals/types';

// Utils
import { sendRequest } from '../../helpers/sendRequest.ts';
import {
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
} from '../../helpers/validators.ts';

// Constants
import { STATUS_CODE } from '../../constants/statusCode.ts';
import {
  ADD_SUCCESS,
  EDIT_SUCCESS,
  errorMsg,
} from '../../constants/messages.ts';
import { USER_PATH } from '../../constants/path.ts';
import Select, { ISelectOptions } from '../../components/Select';

// Hooks
import { useFetch } from '../../hooks/useFetch.ts';

// Styled
import { FormBtn } from './styled.ts';
import { INVALID_FIELD, INVALID_PHONE, REQUIRED_FIELD_ERROR } from '../../constants/formValidateMessage.ts';

interface IUserFormProp {
  onClose: () => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  user?: TUser | null;
  isAdd: boolean;
}

const UserForm = ({
  onClose,
  reload,
  setReload,
  user,
  isAdd,
}: IUserFormProp) => {
  const formMethods = useForm<TUser>({
    defaultValues: {
      roomId: 1,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = formMethods;
  const [options, setOptions] = useState<ISelectOptions[]>();
  const { data, errorFetchMsg } = useFetch('rooms');

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [reset, user]);

  useEffect(() => {
    if (data) {
      const tempData = data as TKeyValue[];
      const tempOptions: ISelectOptions[] = [];
      tempData.forEach((item) => {
        tempOptions.push({
          label: item.name! as string,
          value: item.id! as string,
        });
      });

      setOptions(tempOptions);
    }

    if (errorFetchMsg) {
      toast.error(errorFetchMsg);
    }
  }, [data, errorFetchMsg]);

  // Submit form
  const onSubmit = async (user: TUser) => {
    try {
      if (isAdd) {
        // Add request
        const response = await sendRequest(
          USER_PATH,
          JSON.stringify(user),
          'POST'
        );

        if (response.statusCode === STATUS_CODE.CREATE) {
          toast.success(ADD_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }

        // TODO Update status when user create
      } else {
        // Edit request
        const response = await sendRequest(
          USER_PATH + `/${user!.id}`,
          JSON.stringify(user),
          'PUT'
        );

        if (response.statusCode == STATUS_CODE.OK) {
          toast.success(EDIT_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }
      }
      // Reload table data
      setReload(!reload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    reset();
    onClose();
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" id="id" {...register('id')} />
        <FormRow label="Full Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register('name', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkValidName: (value) =>
                  isValidString(value) || INVALID_FIELD,
              },
              onChange: () => trigger('name'),
            })}
          />
        </FormRow>

        <FormRow
          label="Identified Code"
          error={errors?.identifiedCode?.message}
        >
          <Input
            type="text"
            id="identifiedCode"
            {...register('identifiedCode', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkIdentifiedCode: (v) =>
                  isValidNumber(v) || INVALID_FIELD,
              },
              onChange: () => trigger('identifiedCode'),
            })}
          />
        </FormRow>

        <FormRow label="Phone" error={errors?.phone?.message}>
          <Input
            type="text"
            id="phone"
            {...register('phone', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkPhoneNum: (v) =>
                  isValidPhoneNumber(v) || INVALID_PHONE,
              },
              onChange: () => trigger('phone'),
            })}
          />
        </FormRow>

        <FormRow label="Room">
          <Select id="roomId" options={options!} />
        </FormRow>

        <FormRow label="Address" error={errors.address?.message}>
          <TextArea
            id="address"
            rows={3}
            {...register('address', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkValidString: (v) =>
                  isValidString(v) || INVALID_FIELD,
              },
              onChange: () => trigger('address'),
            })}
          />
        </FormRow>

        <Form.Action>
          <FormBtn type="submit" name="submit" disabled={!isDirty || !isValid}>
            {
              // prettier-ignore
              isAdd
              ? 'Add'
              : 'Save'
            }
          </FormBtn>
          <FormBtn type="button" styled="secondary">
            Close
          </FormBtn>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
