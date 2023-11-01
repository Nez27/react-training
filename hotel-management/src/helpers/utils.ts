// Constants
import { REQUIRED_FIELD_ERROR, invalidFormatMsg } from '../constants/messages';

// Types
import {
  TKeyString,
  TKeyValue,
  TPropValues,
  TStateSchema,
} from '../globals/types';

/**
 * The function check value has type boolean or not
 * @param value The value need to checked
 * @returns A boolean indicating whether or not the argument has type boolean
 */
const isBool = (value: unknown) => {
  return typeof value === 'boolean';
};

/**
 * The function check value has type object or not
 * @param value The value need to checked
 * @returns A boolean indicating whether or not the argument has type object.
 */
const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null;
};

/**
 * Set required error for value
 * @param value The value set required or not
 * @param isRequired Set required for value
 * @returns Return error text if value has required
 */
const isRequired = (value: string | number, isRequired: unknown) => {
  if (!value && isRequired) return REQUIRED_FIELD_ERROR;
  return '';
};

/**
 * Get values from props
 * @param stateSchema StateSchema value
 * @param prop Prop value (Has 3 type: boolean | "value" | "error")
 * @returns Return value object depend on props
 */
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

/**
 * Create validator object
 * @param param0 Pass TValidator object
 * @returns An object contains condition validator
 */
const addValidator = ({ validatorFunc, prop, required = true }: TValidator) => {
  return {
    required,
    validator: {
      func: validatorFunc,
      error: invalidFormatMsg(prop),
    },
  };
};

/**
 * Return the object contains values of object pass
 * @param obj Object need to get value
 * @returns The object contains value of object
 */
const getValueFromObj = <T>(obj: T | null = null): TKeyString => {
  let result = {};

  if (obj) {
    for (const key of Object.keys(obj)) {
      const tempValue = obj[key as keyof typeof obj];
      let value: string | boolean = '';

      if (typeof tempValue === 'string' || typeof tempValue === 'boolean') {
        value = tempValue;
      }

      if (typeof tempValue === 'number') {
        value = tempValue.toString();
      }

      result = { ...result, [`${key}Value`]: value };
    }
  }

  return result;
};

/**
 * Create query url for search
 * @param columnSearch Column want to search
 * @param keySearch Keyword search
 * @param sort Sort by
 * @param order Order by
 * @returns Return query url
 */
const searchQuery = (
  columnSearch: string,
  keySearch: string,
  sort: string,
  order: string,
) => {
  // prettier-ignore
  const phoneParams = keySearch
    ? `${columnSearch}_like=` + keySearch
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
