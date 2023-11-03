const errorMsg = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

const ADD_SUCCESS = 'Add success';
const EDIT_SUCCESS = 'Edit success';
const CONFIRM_DELETE = 'Are you sure to delete it?';
const DELETE_SUCCESS = 'Delete success';

export {
  ADD_SUCCESS,
  errorMsg,
  EDIT_SUCCESS,
  CONFIRM_DELETE,
  DELETE_SUCCESS,
};
