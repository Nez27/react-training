// Constants
import { REQUIRED_FIELD_ERROR } from '../constants/formValidateMessage';

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

export { errorMsg, formatCurrency, REQUIRED_FIELD_ERROR };
