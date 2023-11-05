import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// Hooks
import { useForm } from 'react-hook-form';

// Styled
import Button from '../../commons/styles/Button.ts';
import Input from '../../commons/styles/Input.ts';

// Types
import { Nullable, TRoom } from '../../globals/types.ts';

// Constants
import { ROOM_PATH } from '../../constants/path.ts';
import { STATUS_CODE } from '../../constants/responseStatus.ts';
import {
  ADD_SUCCESS,
  EDIT_SUCCESS,
  errorMsg,
} from '../../constants/messages.ts';
import {
  INVALID_DISCOUNT,
  INVALID_FIELD,
  REQUIRED_FIELD_ERROR,
} from '../../constants/formValidateMessage.ts';

// Helpers
import { sendRequest } from '../../helpers/sendRequest.ts';
import {
  isValidDiscount,
  isValidNumber,
  isValidString,
} from '../../helpers/validators.ts';

// Components
import FormRow from '../../components/LabelControl/index.tsx';
import Form from '../../components/Form/index.tsx';

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
    cursor: no-drop;
  }
`;

interface IRoomFormProp {
  onClose: () => void;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  room?: Nullable<TRoom>;
  isAdd: boolean;
}

const RoomForm = ({
  onClose,
  reload,
  setReload,
  room,
  isAdd,
}: IRoomFormProp) => {
  const formMethods = useForm<TRoom>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = formMethods;

  useEffect(() => {
    if (room) {
      reset(room);
    }
  }, [room, reset]);

  // Submit form
  const onSubmit = async (room: TRoom) => {
    // Calculate final price
    room.finalPrice = room.price - (room.price * room.discount) / 100;

    try {
      if (isAdd) {
        // Add request

        const response = await sendRequest(
          ROOM_PATH,
          'POST',
          JSON.stringify(room)
        );

        if (response.statusCode === STATUS_CODE.CREATE) {
          toast.success(ADD_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }
      } else {
        // Edit request
        const response = await sendRequest(
          ROOM_PATH + `/${room!.id}`,
          'PUT',
          JSON.stringify(room)
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type="hidden" id="id" {...register('id')} />
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: REQUIRED_FIELD_ERROR,
            validate: {
              checkValidName: (value) => isValidString(value) || INVALID_FIELD,
            },
            onChange: () => trigger('name'),
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="text"
          id="price"
          {...register('price', {
            valueAsNumber: true,
            required: REQUIRED_FIELD_ERROR,
            validate: {
              checkIdentifiedCode: (v) =>
                isValidNumber(v.toString()) || INVALID_FIELD,
            },
            onChange: () => trigger('price'),
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="text"
          id="phone"
          {...register('discount', {
            valueAsNumber: true,
            required: REQUIRED_FIELD_ERROR,
            validate: {
              checkPhoneNum: (v) => isValidDiscount(v) || INVALID_DISCOUNT,
            },
            onChange: () => trigger('discount'),
          })}
        />
      </FormRow>

      <Form.Action>
        <FormBtn type="submit" name="submit" disabled={!isDirty || !isValid}>
          {
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
  );
};

export default RoomForm;
