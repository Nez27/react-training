import { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

// Styled
import Input from '../../commons/styles/Input.ts';
import TextArea from '../../commons/styles/TextArea.ts';

// Components
import Form from '../../components/Form/index.tsx';
import FormRow from '../../components/LabelControl/index.tsx';
import Button from '../../commons/styles/Button.ts';

// Types
import {
  TKeyValue,
  TRoom,
  TStateSchema,
  TValidator,
} from '../../globals/types.ts';

// Hooks
import useForm from '../../hooks/useForm.ts';

// Utils
import {
  isValidDiscount,
  isValidNumber,
  isValidString,
  skipCheck,
} from '../../helpers/validators.ts';
import { addValidator, getValueFromObj } from '../../helpers/utils.ts';
import { sendRequest } from '../../helpers/sendRequest.ts';

// Constants
import { STATUS_CODE } from '../../constants/statusCode.ts';
import {
  ADD_SUCCESS,
  DISCOUNT_FIELD_ERROR,
  EDIT_SUCCESS,
  errorMsg,
} from '../../constants/messages.ts';
import { ROOM_PATH } from '../../constants/path.ts';

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
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  room?: TRoom | null;
  isAdd: boolean;
}

const RoomForm = ({
  onClose,
  reload,
  setReload,
  room,
  isAdd,
}: IRoomFormProp) => {
  const [reset, setReset] = useState(true);

  if (isAdd) {
    // If this is add form, reset value
    room = null;
  }

  // prettier-ignore
  const initialValue: string = isAdd 
    ? '' 
    : room! 
    && room.id.toString();

  const {
    idValue,
    nameValue,
    priceValue,
    discountValue,
    statusValue,
    descriptionValue,
  } = getValueFromObj<TRoom>(room);

  // Define your state schema
  // prettier-ignore
  const stateSchema: TStateSchema = {
    id: { 
      value: idValue || '' 
    },
    name: { 
      value: nameValue || '',
      error: '' 
    },
    price: { 
      value: priceValue || '',
      error: '' 
    },
    discount: { 
      value: discountValue || '',
      error: '' 
    },
    status: { 
      value: statusValue || '',
      error: '' 
    },
    description: { 
      value: descriptionValue || '',
      error: '' 
    },
  };

  // prettier-ignore
  const stateValidatorSchema: TValidator = {
    name: addValidator({ 
      validatorFunc: isValidString, 
      prop: 'name' 
    }),
    price: addValidator({
      validatorFunc: isValidNumber,
      prop: 'price',
    }),
    discount: addValidator({ 
      validatorFunc: isValidDiscount, 
      customErrorMsg: DISCOUNT_FIELD_ERROR
    }),
    status: addValidator({
      validatorFunc: skipCheck,
      prop: 'status',
      required: false,
    }),
    description: addValidator({ 
      validatorFunc: isValidString, 
      prop: 'description' 
    }),
  };

  // Submit form
  const onSubmitForm = async (state: TKeyValue) => {
    // Convert to room type
    const data: TRoom = {
      id: +state.id!,
      name: '' + state.name,
      discount: +state.discount!,
      price: +state.price!,
      status: !!state.status,
      description: '' + state.description,
    };

    try {
      if (isAdd) {
        // Add request
        const response = await sendRequest(
          ROOM_PATH,
          JSON.stringify(data),
          'POST',
        );

        if (response.statusCode === STATUS_CODE.CREATE) {
          toast.success(ADD_SUCCESS);

          onResetForm();
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }
      } else {
        // Edit request
        const response = await sendRequest(
          ROOM_PATH + `/${room!.id}`,
          JSON.stringify(data),
          'PUT',
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

    onClose();
  };

  // Close and reset form
  const closeAndReset = () => {
    onClose();
    onResetForm();
  };

  // prettier-ignore
  const { 
    values,
    errors,
    valid,
    handleOnChange,
    handleOnSubmit,
    disable }  =
    useForm(
      stateSchema,
      stateValidatorSchema,
      onSubmitForm,
      initialValue
    );

  // prettier-ignore
  const {
    id,
    name,
    price,
    discount, 
    status,
    description 
  } = values;

  // Clear form value when this is a add form
  useEffect(() => {
    if (isAdd) {
      Object.keys(values).forEach((key) => (values[key] = ''));
    }
  }, [isAdd]); // eslint-disable-line

  // Reset form
  const onResetForm = () => {
    setReset(!reset);
    Object.keys(values).forEach((key) => (values[key] = ''));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Input type="hidden" name="id" value={id as string} />
      <FormRow
        label="Name"
        error={
          // prettier-ignore
          errors.name && valid.name 
            ? (errors.name as string) 
            : ''
        }
      >
        <Input
          type="text"
          name="name"
          value={name as string}
          onChange={handleOnChange}
        />
      </FormRow>
      <FormRow
        label="Price"
        error={
          // prettier-ignore
          errors.price && valid.price 
            ? (errors.price as string) 
            : ''
        }
      >
        <Input
          type="text"
          name="price"
          value={price as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={
          // prettier-ignore
          errors.discount && valid.discount
            ? (errors.discount as string) 
            : ''
        }
      >
        <Input
          type="text"
          name="discount"
          value={discount as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow label="Status">
        <Input
          type="checkbox"
          name="status"
          checked={status as boolean}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={
          // prettier-ignore
          errors.description && valid.description 
            ? (errors.description as string) 
            : ''
        }
      >
        <TextArea
          name="description"
          rows={3}
          value={description as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <Form.Action>
        <FormBtn type="submit" name="submit" disabled={disable}>
          {
            // prettier-ignore
            isAdd
              ? 'Add'
              : 'Save'
          }
        </FormBtn>
        <FormBtn type="button" styled="secondary" onClick={closeAndReset}>
          Close
        </FormBtn>
      </Form.Action>
    </Form>
  );
};

export default RoomForm;
