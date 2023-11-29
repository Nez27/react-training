type Nullable<T> = T | null;

interface IDataState {
  id: number;
  name?: string;
  status?: boolean;
  isBooked?: boolean;
}

export type { Nullable, IDataState };
