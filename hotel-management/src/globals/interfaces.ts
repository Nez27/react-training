import { TUser } from './types';

interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

interface IButton {
  children?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

interface ITable {
  columns?: string;
  children: React.ReactNode;
}

interface ITableBody<T> {
  data?: T[];
  render?: (value: T) => JSX.Element;
}

interface IDialogProps {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  onClose?: () => void;
  reload?: boolean;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: React.MutableRefObject<HTMLDialogElement | undefined>;
  user?: TUser | null;
  isAdd?: boolean;
}

export type { IMenusContext, IButton, ITable, ITableBody, IDialogProps };
