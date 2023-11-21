import styled from 'styled-components';

// Styled
import Button from '@commonStyle/Button.ts';
import Input from '@commonStyle/Input.ts';

// Types
import { IRoom } from '@type/rooms.ts';

// Constants
import {
  INVALID_FIELD,
  REQUIRED_FIELD_ERROR,
} from '@constant/formValidateMessage.ts';
import { REGEX } from '../../constants/commons.ts';

// Helpers
import { isValidRegex, isValidString } from '@helper/validators.ts';

// Components
import Form from '@component/Form/index.tsx';

// Hooks
import { useForm } from 'react-hook-form';
import { useCreateRoom } from '@hook/rooms/useCreateRoom.ts';
import { useUpdateRoom } from '@hook/rooms/useUpdateRoom.ts';

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
  room?: IRoom;
}

const RoomForm = ({ onCloseModal, room }: IRoomFormProp) => {
  const { isCreating, createRoom } = useCreateRoom();
  const { isUpdating, updateRoom } = useUpdateRoom();
  const isLoading = isCreating || isUpdating;
  const { id: editId, ...editValues } = { ...room };
  const formMethods = useForm<IRoom>({
    defaultValues: editId 
      ? editValues 
      : {},
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = formMethods;

  // Submit form
  const onSubmit = async (newRoom: IRoom) => {
    if (!editId) {
      // Add request
      createRoom(newRoom, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      // Edit request
      newRoom.id = editId!;
      updateRoom(newRoom, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: REQUIRED_FIELD_ERROR,
            validate: {
              checkValidRoomName: (value) =>
                isValidString(value) || INVALID_FIELD,
            },
            onChange: () => trigger('name'),
          })}
        />
      </Form.Row>

      <Form.Row label="Price" error={errors?.price?.message}>
        <Input
          type="text"
          id="price"
          {...register('price', {
            valueAsNumber: true,
            required: REQUIRED_FIELD_ERROR,
            validate: {
              checkPrice: (v) =>
                isValidRegex(new RegExp(REGEX.NUMBER), v.toString()) ||
                INVALID_FIELD,
            },
            onChange: () => trigger('price'),
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
            !editId 
              ? 'Add' 
              : 'Save'
          }
        </FormBtn>
        <FormBtn type="button" variations="secondary" onClick={onCloseModal}>
          Close
        </FormBtn>
      </Form.Action>
    </Form>
  );
};

export default RoomForm;
