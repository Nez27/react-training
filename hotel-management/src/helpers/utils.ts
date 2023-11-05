// Constants
import { REQUIRED_FIELD_ERROR } from '../constants/formValidateMessage';

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

const formatCurrency = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export { isRequired, searchQuery, formatCurrency, REQUIRED_FIELD_ERROR };
