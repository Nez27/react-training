import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';

// Styled
import Input from '../../commons/styles/Input';
import TextArea from '../../commons/styles/TextArea';

// Components
import Form from '../../components/Form';
import FormRow from '../../components/LabelControl/index.tsx';

// Utils
import { sendRequest } from '../../helpers/sendRequest.ts';
import {
  isEmptyObj,
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
} from '../../helpers/validators.ts';

// Constants
import { STATUS_CODE } from '../../constants/responseStatus.ts';
import {
  ADD_SUCCESS,
  EDIT_SUCCESS,
  errorMsg,
} from '../../constants/messages.ts';
import { USER_PATH } from '../../constants/path.ts';
import Select, { ISelectOptions } from '../../components/Select';

// Hooks

// Styled
import { FormBtn } from './styled.ts';
import {
  INVALID_FIELD,
  INVALID_PHONE,
  REQUIRED_FIELD_ERROR,
} from '../../constants/formValidateMessage.ts';
import { getAllRoom, updateRoomStatus } from '../../services/roomServices.ts';
import { TUser } from '../../globals/types.ts';
import { INIT_VALUE_USER_FORM } from '../../constants/variables.ts';

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
  const formMethods = useForm<TUser>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = formMethods;
  const [options, setOptions] = useState<ISelectOptions[]>();

  // Init value when edit form and load options
  useEffect(() => {
    const load = async () => {
      const rooms = await getAllRoom();
      const options: ISelectOptions[] = [];
      const tempUser = isAdd 
        ? {}
        : {...user};

      // Load and set default options room
      if (rooms) {
        rooms.forEach((item) => {
          if (!item.status || tempUser?.roomId === item.id)
            options.push({
              label: item.name! as string,
              value: item.id!.toString(),
            });
        });

        setOptions(options);
        reset({ roomId: +options[0].value });
      }

      if (!isEmptyObj(tempUser)) {
        // Init value
        // Set default value when user not have room yet.
        if (!tempUser.roomId) {
          tempUser.roomId = +options[0].value;
        }

        reset(tempUser);
      } else {
        reset(INIT_VALUE_USER_FORM);
      }
    };

    load();
  }, [reset, user, isAdd]);

  // Submit form
  const onSubmit = async (newUser: TUser) => {
    try {
      if (isAdd) {
        // Add request
        const response = await sendRequest(
          USER_PATH,
          'POST',
          JSON.stringify(newUser)
        );

        if (response.statusCode === STATUS_CODE.CREATE) {
          toast.success(ADD_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }

        // Update room status
        updateRoomStatus(newUser.roomId, true);
      } else {
        // Edit request
        const response = await sendRequest(
          USER_PATH + `/${newUser.id}`,
          'PUT',
          JSON.stringify(newUser)
        );

        if (response.statusCode == STATUS_CODE.OK) {
          toast.success(EDIT_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }

        // Update room status
        updateRoomStatus(user!.roomId, true, newUser.roomId);
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
                checkIdentifiedCode: (v) => isValidNumber(v) || INVALID_FIELD,
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
                checkPhoneNum: (v) => isValidPhoneNumber(v) || INVALID_PHONE,
              },
              onChange: () => trigger('phone'),
            })}
          />
        </FormRow>

        <FormRow label="Room">
          <Select
            id="roomId"
            options={options!}
            ariaLabel="RoomId"
            optionsConfigForm={{
              valueAsNumber: true,
              onChange: () => trigger('roomId'),
            }}
          />
        </FormRow>

        <FormRow label="Address" error={errors.address?.message}>
          <TextArea
            id="address"
            rows={3}
            {...register('address', {
              required: REQUIRED_FIELD_ERROR,
              validate: {
                checkValidString: (v) => isValidString(v) || INVALID_FIELD,
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
          <FormBtn type="button" styled="secondary" onClick={onClose}>
            Close
          </FormBtn>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
