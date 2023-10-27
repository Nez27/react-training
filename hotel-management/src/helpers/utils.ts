import { invalidFormatMessage } from '../constants/messages';
import { TKeyValue, TPropValues, TStateSchema } from '../globals/types';

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
      error: invalidFormatMessage(prop),
    },
  };
};

export {
  isObject,
  isRequired,
  getPropValues,
  addValidator,
  VALUE,
  ERROR,
  REQUIRED_FIELD_ERROR,
};
