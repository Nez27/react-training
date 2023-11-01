// Constants
import { REQUIRED_FIELD_ERROR, invalidFormatMsg } from '../constants/messages';

// Types
import {
  TKeyString,
  TKeyValue,
  TPropValues,
  TStateSchema,
} from '../globals/types';

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

const getValueFromObj = <T>(obj: T | null = null): TKeyString => {
  let result = {};

  if (obj) {
    for (const key of Object.keys(obj)) {
      const tempValue = obj[key as keyof typeof obj];
      const value: string | boolean | number =
        typeof tempValue === 'boolean' || typeof tempValue === 'string'
          ? tempValue
          : '';

      result = { ...result, [`${key}Value`]: value };
    }
  }

  return result;
};

const searchQuery = (
  columnSearch: string,
  phone: string,
  sort: string,
  order: string,
) => {
  // prettier-ignore
  const phoneParams = phone
    ? `${columnSearch}_like=` + phone
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
  getValueFromObj,
  addValidator,
  searchQuery,
  REQUIRED_FIELD_ERROR,
};
