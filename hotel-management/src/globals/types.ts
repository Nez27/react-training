type TUser = {
  id: string;
  name: string;
  identifiedCode: string;
  address: string;
  phone: string;
  roomId: string;
};

type TRoom = {
  id: string;
  name: string;
  amount: string;
  price: string;
  discount: string;
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
  [key: string]: string | undefined | boolean | number;
};

export type Test = {
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
  TPropValues,
  TValidator,
  TResponse,
};
