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
import { TKeyValue, TStateSchema, TValidator } from '../../globals/types';

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

  // prettier-ignore
  const stateValidatorSchema: TValidator = {
    fullName: addValidator({ 
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
    room: addValidator({ 
      validatorFunc: isValidNumber, 
      prop: 'room number' 
    }),
    address: addValidator({ 
      validatorFunc: isValidAddress, 
      prop: 'address' 
    }),
  };

  // Submit form
  const onSubmitForm = (state: TKeyValue) => {
    alert(JSON.stringify(state, null, 2));
    onClose();
    onResetForm();
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
    fullName, 
    identifiedCode,
    phone,
    room, 
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
          errors.fullName && dirty.fullName ? 
            (errors.fullName as string) 
            : ''
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
          errors.room && dirty.room ? 
            (errors.room as string) 
            : ''
        }
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
