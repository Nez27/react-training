import { useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

// Styled
import Input from '../../commons/styles/Input';
import TextArea from '../../commons/styles/TextArea';

// Components
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Button from '../../commons/styles/Button.ts';

// Types
import {
  TKeyValue,
  TResponse,
  TStateSchema,
  TValidator,
} from '../../globals/types';

// Hooks
import useForm from '../../hooks/useForm';

// Utils
import {
  isValidAddress,
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
} from '../../helpers/validators';
import { addValidator } from '../../helpers/utils.ts';
import { sendRequest } from '../../helpers/sendRequest.ts';

// Constants
import { STATUS_CODE } from '../../constants/statusCode.ts';
import { ADD_SUCCESS, ERROR_MSG } from '../../constants/messages.ts';

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
  }
`;

interface IUserFormProp {
  onClose: () => void;
  reload: boolean;
  onReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm = ({ onClose, reload, onReload }: IUserFormProp) => {
  const [reset, setReset] = useState(true);

  // Define your state schema
  const stateSchema: TStateSchema = {
    name: { value: '', error: '' },
    identifiedCode: { value: '', error: '' },
    phone: { value: '', error: '' },
    roomId: { value: '', error: '' },
    address: { value: '', error: '' },
  };

  // prettier-ignore
  const stateValidatorSchema: TValidator = {
    name: addValidator({ 
      validatorFunc: isValidString, 
      prop: 'full name' 
    }),
    identifiedCode: addValidator({
      validatorFunc: isValidNumber,
      prop: 'identified code',
    }),
    phone: addValidator({
      validatorFunc: isValidPhoneNumber,
      prop: 'phone number',
    }),
    roomId: addValidator({ 
      validatorFunc: isValidNumber, 
      prop: 'room number' 
    }),
    address: addValidator({ 
      validatorFunc: isValidAddress, 
      prop: 'address' 
    }),
  };

  // Submit form
  const onSubmitForm = async (state: TKeyValue) => {
    try {
      const response = await sendRequest(
        'users',
        JSON.stringify(state),
        'POST',
      );

      if (response.statusCode === STATUS_CODE.CREATE) {
        toast.success(ADD_SUCCESS);
        onReload(!reload);
      } else {
        toast.error(ERROR_MSG(response.statusCode, response.msg));
      }

      onResetForm();
    } catch (error) {
      toast.error(
        ERROR_MSG((error as TResponse).statusCode, (error as TResponse).msg),
      );
    }

    onClose();
  };

  // prettier-ignore
  const { 
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable }  =
    useForm(
      stateSchema,
      stateValidatorSchema,
      onSubmitForm,
    );

  // prettier-ignore
  const { 
    name, 
    identifiedCode,
    phone,
    roomId, 
    address 
  } = values;

  // Reset form
  const onResetForm = () => {
    setReset(!reset);
    Object.keys(values).forEach((key) => (values[key] = ''));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Input type="hidden" id="id" />
      <FormRow
        label="Full Name"
        error={
          // prettier-ignore
          errors.name && dirty.name ? 
            (errors.name as string) 
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
        label="Identified Code"
        error={
          errors.identifiedCode && dirty.identifiedCode
            ? (errors.identifiedCode as string)
            : ''
        }
      >
        <Input
          type="text"
          name="identifiedCode"
          value={identifiedCode as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Phone"
        error={
          // prettier-ignore
          errors.phone && dirty.phone ? 
            (errors.phone as string) 
            : ''
        }
      >
        <Input
          type="text"
          name="phone"
          value={phone as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Room"
        error={
          // prettier-ignore
          errors.roomId && dirty.roomId ? 
            (errors.roomId as string) 
            : ''
        }
      >
        <Input
          type="text"
          name="roomId"
          value={roomId as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Address"
        error={
          // prettier-ignore
          errors.address && dirty.address ? 
            (errors.address as string) 
            : ''
        }
      >
        <TextArea
          name="address"
          rows={3}
          value={address as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <Form.Action>
        <FormBtn type="submit" name="submit" disabled={disable}>
          Add
        </FormBtn>
        <FormBtn type="button" styled="secondary" onClick={onClose}>
          Close
        </FormBtn>
      </Form.Action>
    </Form>
  );
};

export default UserForm;
