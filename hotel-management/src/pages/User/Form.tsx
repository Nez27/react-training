import styled from 'styled-components';

// Styled
import Input from '../../commons/styles/Input';
import { useState } from 'react';
import TextArea from '../../commons/styles/TextArea';

// Components
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Button from '../../commons/styles/Button.ts';

// Types
import { TKeyValue, TStateSchema } from '../../globals/types';

// Hooks
import useForm from '../../hooks/useForm';

// Utils
import {
  isValidAddress,
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
} from '../../helpers/validators';

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
  }
`;

interface IUserFormProp {
  onClose: () => void;
}

const UserForm = ({ onClose }: IUserFormProp) => {
  const [reset, setReset] = useState(true);

  // Define your state schema
  const stateSchema: TStateSchema = {
    fullName: { value: '', error: '' },
    identifiedCode: { value: '', error: '' },
    phone: { value: '', error: '' },
    room: { value: '', error: '' },
    address: { value: '', error: '' },
  };

  // Submit form
  const onSubmitForm = (state: TKeyValue) => {
    alert(JSON.stringify(state, null, 2));
    onClose();
    onResetForm();
  };

  const { values, errors, dirty, handleOnChange, handleOnSubmit, disable } =
    useForm(
      stateSchema,
      {
        fullName: {
          required: true,
          validator: {
            func: (input) => isValidString(input),
            error: 'Invalid full name format.',
          },
        },
        identifiedCode: {
          required: true,
          validator: {
            func: (input) => isValidNumber(input),
            error: 'Invalid identified code format.',
          },
        },
        phone: {
          required: true,
          validator: {
            func: (input) => isValidPhoneNumber(input),
            error: 'Invalid phone format.',
          },
        },
        room: {
          required: true,
          validator: {
            func: (input) => isValidNumber(input),
            error: 'Invalid room number format.',
          },
        },
        address: {
          required: true,
          validator: {
            func: (input) => isValidAddress(input),
            error: 'Invalid address format.',
          },
        },
      },
      onSubmitForm,
    );

  const { fullName, identifiedCode, phone, room, address } = values;

  // Reset form
  const onResetForm = () => {
    setReset(() => !reset);
    Object.keys(values).forEach((key) => (values[key] = ''));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Input type="hidden" id="id" />
      <FormRow
        label="Full Name"
        error={
          errors.fullName && dirty.fullName ? (errors.fullName as string) : ''
        }
      >
        <Input
          type="text"
          name="fullName"
          value={fullName as string}
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
        error={errors.phone && dirty.phone ? (errors.phone as string) : ''}
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
        error={errors.room && dirty.room ? (errors.room as string) : ''}
      >
        <Input
          type="text"
          name="room"
          value={room as string}
          onChange={handleOnChange}
        />
      </FormRow>

      <FormRow
        label="Address"
        error={
          errors.address && dirty.address ? (errors.address as string) : ''
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
