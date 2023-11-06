interface IResponse<T> {
  statusCode: number;
  msg: string;
  data?: T;
}

export type { IResponse };
