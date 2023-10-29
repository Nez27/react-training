const INVALID_FORMAT_MSG = (field: string) => {
  return `Invalid ${field} format`;
};

const ADD_SUCCESS = 'Add success';

const ERROR_MSG = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

const TIME_OUT_MSG = 'Connection time out!';

export { INVALID_FORMAT_MSG, ADD_SUCCESS, ERROR_MSG, TIME_OUT_MSG };
