type TUser = {
  id: number;
  name: string;
  identifiedCode: string;
  address: string;
  phone: string;
  roomId: number;
};

type TRoom = {
  id: number;
  name: string;
  amount: number;
  price: number;
  discount: number;
  description: string;
  status: boolean;
};

type TStateSchema = {
  [key: string]: {
    value?: string;
    error?: string;
  };
};

type TKeyValue = {
  [key: string]: boolean | undefined | string;
};

type TKeyString = {
  [key: string]: string;
};

type TPropValues = 'value' | 'error' | boolean;

type TValidator = {
  [key: string]: {
    required?: boolean;
    validator?: {
      func?: (value: string) => boolean;
      error?: string;
    };
  };
};

type TResponse = {
  statusCode: number;
  msg: string;
};

export type {
  TUser,
  TRoom,
  TStateSchema,
  TKeyValue,
  TKeyString,
  TPropValues,
  TValidator,
  TResponse,
};
