const invalidFormatMsg = (field: string) => {
  return `Invalid ${field} format`;
};

const errorMsg = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

const ADD_SUCCESS = 'Add success';
const EDIT_SUCCESS = 'Edit success';
const CONFIRM_DELETE = 'Are you sure to delete it?';
const DELETE_SUCCESS = 'Delete success';
const REQUIRED_FIELD_ERROR = 'This is required field';
const DISCOUNT_FIELD_ERROR =
  'Discount should be greater than 0 and less than 100';

export {
  invalidFormatMsg,
  ADD_SUCCESS,
  errorMsg,
  EDIT_SUCCESS,
  CONFIRM_DELETE,
  DELETE_SUCCESS,
  REQUIRED_FIELD_ERROR,
  DISCOUNT_FIELD_ERROR,
};
