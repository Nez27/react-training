import { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

// Styled
import Input from '../../commons/styles/Input';
import TextArea from '../../commons/styles/TextArea';

// Components
import Form from '../../components/Form';
import FormRow from '../../components/LabelControl/index.tsx';
import Button from '../../commons/styles/Button.ts';

// Types
import {
  TKeyValue,
  TStateSchema,
  TUser,
  TValidator,
} from '../../globals/types';

// Hooks
import useForm from '../../hooks/useForm';

// Utils
import {
  isValidString,
  isValidNumber,
  isValidPhoneNumber,
} from '../../helpers/validators';
import { addValidator, getValueFromObj } from '../../helpers/utils.ts';
import { sendRequest } from '../../helpers/sendRequest.ts';

// Constants
import { STATUS_CODE } from '../../constants/statusCode.ts';
import {
  ADD_SUCCESS,
  EDIT_SUCCESS,
  errorMsg,
} from '../../constants/messages.ts';
import { USER_PATH } from '../../constants/path.ts';
import Select, { ISelectOptions } from '../../components/Select/index.tsx';
import { useFetch } from '../../hooks/useFetch.ts';

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
    cursor: no-drop;
  }
`;

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
  const [reset, setReset] = useState(true);
  const [options, setOptions] = useState<ISelectOptions[]>();
  const { data, errorFetchMsg } = useFetch('rooms');

  useEffect(() => {
    if (data) {
      const tempData = data as TKeyValue[];
      const tempOptions: ISelectOptions[] = [];
      tempData.forEach((item) => {
        tempOptions.push({
          label: item.name! as string,
          value: item.id! as string,
        });
      });

      setOptions(tempOptions);
    }

    if (errorFetchMsg) {
      toast.error(errorFetchMsg);
    }
  }, [data, errorFetchMsg]);

  if (isAdd) {
    // If this is add form, reset value
    user = null;
  }

  // prettier-ignore
  const initialValue: string = isAdd 
    ? '' 
    : user! 
    && user.id.toLocaleString();

  const {
    idValue,
    nameValue,
    identifiedCodeValue,
    phoneValue,
    roomIdValue,
    addressValue,
  } = getValueFromObj<TUser>(user);

  // Define your state schema
  // prettier-ignore
  const stateSchema: TStateSchema = {
    id: { value: idValue || '' },
    name: { 
      value: nameValue || '',
      error: '' ,
    },
    identifiedCode: {
      value: identifiedCodeValue || '',
      error: '',
    },
    phone: { 
      value: phoneValue || '',
       error: '',
    },
    roomId: { 
      value: roomIdValue || '' + (options && options[0].value),
      error: '' ,
    },
    address: { 
      value: addressValue || '',
      error: ''
    },
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
      validatorFunc: isValidString, 
      prop: 'address' 
    }),
  };

  // Submit form
  const onSubmitForm = async (state: TKeyValue) => {
    // Convert to user type
    const data: TUser = {
      id: +state.id!,
      name: '' + state.name,
      identifiedCode: '' + state.identifiedCode,
      phone: '' + state.phone,
      roomId: +state.roomId!,
      address: '' + state.address,
    };

    try {
      if (isAdd) {
        // Add request
        const response = await sendRequest(
          USER_PATH,
          JSON.stringify(data),
          'POST'
        );

        if (response.statusCode === STATUS_CODE.CREATE) {
          toast.success(ADD_SUCCESS);
        } else {
          throw new Error(errorMsg(response.statusCode, response.msg));
        }

        onResetForm();
      } else {
        // Edit request
        const response = await sendRequest(
          USER_PATH + `/${user!.id}`,
          JSON.stringify(data),
          'PUT'
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
    identifiedCode,
    phone,
    roomId, 
    address 
  } = values;

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
        label="Full Name"
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
        label="Identified Code"
        error={
          errors.identifiedCode && valid.identifiedCode
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
          errors.phone && valid.phone 
            ? (errors.phone as string) 
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
          errors.roomId && valid.roomId
            ? (errors.roomId as string) 
            : ''
        }
      >
        <Select
          name="roomId"
          value={roomId as string}
          onChange={handleOnChange}
          options={options!}
        />
      </FormRow>

      <FormRow
        label="Address"
        error={
          // prettier-ignore
          errors.address && valid.address 
            ? (errors.address as string) 
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

export default UserForm;
