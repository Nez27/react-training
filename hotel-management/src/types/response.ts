type TResponse<T> = {
  statusCode: number;
  msg: string;
  data?: T;
};

export type { TResponse };
