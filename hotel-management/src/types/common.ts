type Nullable<T> = T | null;

interface IDataState {
  id: number;
  name?: string;
  status?: boolean;
  isBooked?: boolean;
}

interface ILogin {
  email: string;
  password: string;
}

type TDirection = 'vertical' | 'horizontal';

export type { Nullable, IDataState, TDirection, ILogin };
