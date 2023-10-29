const invalidFormatMsg = (field: string) => {
  return `Invalid ${field} format`;
};

const ADD_SUCCESS = 'Add success';

const errorMsg = (errorCode: number, msg: string) => {
  return `Error code: ${errorCode}. Message: ${msg}`;
};

export { invalidFormatMsg, ADD_SUCCESS, errorMsg };
