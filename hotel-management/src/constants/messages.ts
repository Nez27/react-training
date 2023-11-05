const errorMsg = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

const ADD_SUCCESS = 'Add success';
const EDIT_SUCCESS = 'Edit success';
const CONFIRM_MESSAGE = 'Do you want to checkout this user?';
const CONFIRM_DELETE = 'Are you sure to delete it?'
const DELETE_SUCCESS = 'Delete success';
const CHECKOUT_SUCCESS = 'Check out success';

export {
  ADD_SUCCESS,
  errorMsg,
  EDIT_SUCCESS,
  CONFIRM_MESSAGE,
  CONFIRM_DELETE,
  DELETE_SUCCESS,
  CHECKOUT_SUCCESS,
};
