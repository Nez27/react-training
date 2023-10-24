export interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IButton {
  children?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

export interface ITable {
  columns?: string;
  children: React.ReactNode;
}

export interface ITableBody<T> {
  data?: T[];
  render?: (value: T) => JSX.Element;
}
