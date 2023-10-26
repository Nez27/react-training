export type TUser = {
  id: string;
  name: string;
  identifiedCode: string;
  address: string;
  phone: string;
  roomId: string;
};

export type TStateSchema = {
  [key: string]: {
    value?: string;
    error?: string;
  };
};

export type TKeyValue = {
  [key: string]: string | undefined | boolean;
};

export type TPropValues = 'value' | 'error' | boolean;

export type TValidator = {
  [key: string]: {
    required?: boolean;
    validator?: {
      func?: (value: string) => boolean;
      error?: string;
    };
  };
};
