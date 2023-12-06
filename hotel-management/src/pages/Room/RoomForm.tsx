import { useForm } from 'react-hook-form';

// Styled
import Input from '@src/commons/styles/Input.ts';

// Types
import { IRoom } from '@src/types/room.ts';

// Constants
import {
  INVALID_FIELD,
  REQUIRED_FIELD_ERROR,
} from '@src/constants/formValidateMessage.ts';
import { REGEX } from '../../constants/commons.ts';

// Helpers
import { isValidRegex, isValidString } from '@src/helpers/validators.ts';

// Components
import Form from '@src/components/Form/index.tsx';

// Hooks
import { useCreateRoom } from '@src/hooks/rooms/useCreateRoom.ts';
import { useUpdateRoom } from '@src/hooks/rooms/useUpdateRoom.ts';

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
        <Form.Button
          type="submit"
          name="submit"
          disabled={!isDirty || !isValid || isLoading}
        >
          {
            !editId 
              ? 'Add' 
              : 'Save'
          }
        </Form.Button>
        <Form.Button type="button" variations="secondary" onClick={onCloseModal}>
          Close
        </Form.Button>
      </Form.Action>
    </Form>
  );
};

export default RoomForm;
