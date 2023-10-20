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
