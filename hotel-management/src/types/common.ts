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

interface ColumnProps {
  key: string;
  title: string;
  width: number;
  isDateValue?: boolean;
}

type TDirection = 'vertical' | 'horizontal';

export type {
  Nullable,
  IDataState,
  TDirection,
  ILogin,
  ColumnProps
};
