// Constants
import { REQUIRED_FIELD_ERROR } from '../constants/formValidateMessage';

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
  order: string
) => {
  const phoneParams = keySearch ? `${columnSearch}_like=` + keySearch : '';

  const sortParams = sort ? '_sort=' + sort : '';

  const orderParams = order ? '_order=' + order : '';
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

const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export {
  isRequired,
  getPropValues,
  getValueFromObj,
  searchQuery,
  formatCurrency,
  REQUIRED_FIELD_ERROR,
};
