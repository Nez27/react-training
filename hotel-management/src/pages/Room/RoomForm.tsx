import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// Hooks
import { useForm } from 'react-hook-form';

// Styled
import Button from '../../commons/styles/Button.ts';
import Input from '../../commons/styles/Input.ts';

// Types
import { Nullable } from '../../types/common.ts';
import { IRoom } from '../../types/rooms.ts';

// Constants
import {
  ADD_SUCCESS,
  EDIT_SUCCESS,
} from '../../constants/messages.ts';
import {
  INVALID_DISCOUNT,
  INVALID_FIELD,
  REQUIRED_FIELD_ERROR,
} from '../../constants/formValidateMessage.ts';

// Helpers
import {
  isValidDiscount,
  isValidNumber,
  isValidString,
} from '../../helpers/validators.ts';

// Components
import FormRow from '../../components/LabelControl/index.tsx';
import Form from '../../components/Form/index.tsx';
import { addRoom, updateRoom } from '../../services/roomServices.ts';
import { INIT_VALUE_ROOM_FORM } from '../../constants/variables.ts';

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
    cursor: no-drop;
  }
`;

interface IRoomFormProp {
  onCloseModal?: () => void;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  roomEdit?: Nullable<IRoom>;
}

const RoomForm = ({
  onCloseModal,
  reload,
  setReload,
  roomEdit,
}: IRoomFormProp) => {
  const formMethods = useForm<IRoom>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
    trigger,
  } = formMethods;

  useEffect(() => {
    if (roomEdit) {
      reset(roomEdit);
    } else {
      reset(INIT_VALUE_ROOM_FORM);
    }
  }, [roomEdit, reset]);

  // Submit form
  const onSubmit = async (room: IRoom) => {
    // Calculate final price
    room.finalPrice = room.price - (room.price * room.discount) / 100;

    try {
      if (!roomEdit) {
        // Add request
        const response = await addRoom(room);
        
        if(response) {
          toast.success(ADD_SUCCESS);
        }
      } else {
        // Edit request
        const response = await updateRoom(room);

        if (response) {
          toast.success(EDIT_SUCCESS);
        }
      }
      // Reload table data
      setReload!(!reload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    reset();
    onCloseModal!();
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
        <FormBtn type="submit" name="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {
            !roomEdit 
              ? 'Add' 
              : 'Save'
          }
        </FormBtn>
        <FormBtn type="button" styled="secondary" onClick={onCloseModal}>
          Close
        </FormBtn>
      </Form.Action>
    </Form>
  );
};

export default RoomForm;
