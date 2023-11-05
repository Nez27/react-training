type TUser = {
  id: number;
  name: string;
  identifiedCode: string;
  phone: string;
  roomId: number;
};

type TRoom = {
  id: number;
  name: string;
  price: number;
  discount: number;
  finalPrice: number;
  status: boolean;
};

type TResponse<T> = {
  statusCode: number;
  msg: string;
  data?: T;
};

type Nullable<T> = T | null;

export type {
  TUser,
  TRoom,
  TResponse,
  Nullable,
};
