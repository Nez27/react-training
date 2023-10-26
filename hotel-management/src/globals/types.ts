type TUser = {
  id: string;
  name: string;
  identifiedCode: string;
  address: string;
  phone: string;
  roomId: string;
};

type TStateSchema = {
  [key: string]: {
    value?: string;
    error?: string;
  };
};

type TKeyValue = {
  [key: string]: string | undefined | boolean;
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

export type { TUser, TStateSchema, TKeyValue, TPropValues, TValidator };
