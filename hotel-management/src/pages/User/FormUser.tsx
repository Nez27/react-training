import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';

// Styled
import Input from '../../commons/styles/Input.ts';

// Components
import Form from '../../components/Form/index.tsx';
import FormRow from '../../components/LabelControl/index.tsx';
import Select, { ISelectOptions } from '../../components/Select/index.tsx';

// Helpers
import {
  isEmptyObj,
  isValidName,
  isValidNumber,
  isValidPhoneNumber,
} from '../../helpers/validators.ts';

// Constants
import { ADD_SUCCESS, EDIT_SUCCESS } from '../../constants/messages.ts';
import {
  INVALID_FIELD,
  INVALID_PHONE,
  REQUIRED_FIELD_ERROR,
} from '../../constants/formValidateMessage.ts';
import { INIT_VALUE_USER_FORM } from '../../constants/variables.ts';

// Styled
import { FormBtn } from './styled.ts';

// Services
import { getAllRoom, updateRoomStatus } from '../../services/roomServices.ts';

// Types
import { Nullable } from '../../types/common.ts';
import { IUser } from '../../types/users.ts';
import { IRoom } from '../../types/rooms.ts';
import { createUser, updateUser } from '../../services/userServices.ts';

interface IUserFormProp {
  onCloseModal?: () => void;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  user?: Nullable<IUser>;
}

const UserForm = ({ onCloseModal, reload, setReload, user }: IUserFormProp) => {
  const formMethods = useForm<IUser>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
    trigger,
  } = formMethods;
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [options, setOptions] = useState<ISelectOptions[]>();

  // Init value when edit form and load options
  useEffect(() => {
    const load = async () => {
      const options: ISelectOptions[] = [];
      const tempUser = !user 
        ? { roomId: 0 } 
        : { ...user };

      // Load and set default options room
      if (rooms.length > 0) {
        // Init first options
        options.push({
          label: '---Select---',
          value: '0',
        });

        rooms.forEach((item) => {
          if (!item.status || tempUser?.roomId === item.id)
            options.push({
              label: item.name!,
              value: item.id!.toString(),
            });
        });
      }

      if (options.length > 0) {
        setOptions(options);
      }

      if (!isEmptyObj(tempUser)) {
        // Init value
        reset(tempUser);
      } else {
        reset(INIT_VALUE_USER_FORM);
      }
    };

    load();
  }, [reset, user, rooms]);

  // Submit form
  const onSubmit = useCallback(
    async (newUser: IUser) => {
      try {
        if (!user) {
          // Add request
          const response = await createUser(newUser);

          if (response) {
            toast.success(ADD_SUCCESS);
          }

          // Update room status
          updateRoomStatus(newUser.roomId, true);
        } else {
          // Edit request
          const response = await updateUser(newUser);

          if (response) {
            toast.success(EDIT_SUCCESS);
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
      onCloseModal!();
    },
    [onCloseModal, reload, reset, setReload, user]
  );

  // Load all rooms
  useEffect(() => {
    const loadRoom = async () => {
      const rooms = await getAllRoom();

      if (rooms) {
        setRooms(rooms);
      }
    };

    loadRoom();
  }, [onSubmit]);

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
                checkValidName: (value) => isValidName(value) || INVALID_FIELD,
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
                  isValidNumber(v.toString()) || INVALID_FIELD,
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
          {options && options.length > 1 ? (
            <Select
              id="roomId"
              options={options!}
              ariaLabel="RoomId"
              optionsConfigForm={{
                valueAsNumber: true,
                onChange: () => trigger('roomId'),
                validate: (v) => v !== 0,
              }}
            />
          ) : (
            <p>No room available!</p>
          )}
        </FormRow>

        <Form.Action>
          <FormBtn type="submit" name="submit" disabled={!isDirty || !isValid || isSubmitting}>
            {
              !user 
                ? 'Add' 
                : 'Save'
            }
          </FormBtn>
          <FormBtn type="button" styled="secondary" onClick={onCloseModal}>
            Close
          </FormBtn>
        </Form.Action>
      </Form>
    </FormProvider>
  );
};

export default UserForm;
