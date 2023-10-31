// Constants
import { invalidFormatMsg } from '../constants/messages';

// Types
import { TKeyValue, TPropValues, TStateSchema, TUser } from '../globals/types';

const VALUE = 'value';
const ERROR = 'error';
const REQUIRED_FIELD_ERROR = 'This is required field';

const isBool = (value: unknown) => {
  return typeof value === 'boolean';
};

const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null;
};

const isRequired = (value: string | number, isRequired: unknown) => {
  if (!value && isRequired) return REQUIRED_FIELD_ERROR;
  return '';
};

const getPropValues = (stateSchema: TStateSchema, prop?: TPropValues) => {
  return Object.keys(stateSchema).reduce((field, key) => {
    field[key] = isBool(prop)
      ? prop
      : stateSchema[key][prop as Exclude<TPropValues, boolean>];

    return field;
  }, {} as TKeyValue);
};

type TValidator = {
  validatorFunc: (value: string) => boolean;
  prop: string;
  required?: boolean;
};

const addValidator = ({ validatorFunc, prop, required = true }: TValidator) => {
  return {
    required,
    validator: {
      func: validatorFunc,
      error: invalidFormatMsg(prop),
    },
  };
};

const getValueUser = (user: TUser | null = null, prop: string): string => {
  if (user) {
    return user[prop as keyof TUser];
  }

  return '';
};

const searchQuery = (phone: string, sort: string, order: string) => {
  // prettier-ignore
  const phoneParams = phone
    ? 'phone_like=' + phone
    : '';

  // prettier-ignore
  const sortParams = sort
    ? '_sort=' + sort
    : '';

  // prettier-ignore
  const orderParams = order 
    ? '_order=' + order 
    : '';
  const finalParam = [phoneParams, sortParams, orderParams];
  let query = '';
  let isFirstParam = true;

  finalParam.forEach((param) => {
    if (param) {
      if (isFirstParam) {
        query = query.concat('', param);
        isFirstParam = false;
      } else {
        query = query.concat('&', param);
      }
    }
  });

  return query;
};

export {
  isObject,
  isRequired,
  getPropValues,
  getValueUser,
  addValidator,
  searchQuery,
  VALUE,
  ERROR,
  REQUIRED_FIELD_ERROR,
};
