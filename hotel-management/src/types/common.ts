type Nullable<T> = T | null;

interface IDataState {
  id: number;
  name: string;
}

export type { Nullable, IDataState };
