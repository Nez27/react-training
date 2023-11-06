// Constants
import { REQUIRED_FIELD_ERROR } from '../constants/formValidateMessage';

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
  const phoneParams = keySearch 
    ? `${columnSearch}_like=` + keySearch 
    : '';
  const sortParams = sort 
    ? '_sort=' + sort 
    : '';
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

/**
 * Convert value to currency format with value
 * @param value Value need to be converted
 * @returns Return the string value with currency
 */
const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

/**
 * Create error string
 * @param errorCode Error code
 * @param msg Message error
 * @returns Return the full error string
 */
const errorMsg = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

export { errorMsg, searchQuery, formatCurrency, REQUIRED_FIELD_ERROR };
