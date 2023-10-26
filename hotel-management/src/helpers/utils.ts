import { TKeyValue, TPropValues, TStateSchema } from '../globals/types';

export const VALUE = 'value';
export const ERROR = 'error';
export const REQUIRED_FIELD_ERROR = 'This is required field';

function isBool(value: unknown) {
  return typeof value === 'boolean';
}

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

export { isObject, isRequired, getPropValues };
