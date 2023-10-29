const INVALID_FORMAT_MSG = (field: string) => {
  return `Invalid ${field} format`;
};

const ERROR_MSG = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

const ADD_SUCCESS = 'Add success';
const EDIT_SUCCESS = 'Edit success';
const CONFIRM_DELETE = 'Are you sure to delete it?';
const DELETE_SUCCESS = 'Delete success';

export {
  INVALID_FORMAT_MSG,
  ADD_SUCCESS,
  ERROR_MSG,
  EDIT_SUCCESS,
  CONFIRM_DELETE,
  DELETE_SUCCESS,
};
