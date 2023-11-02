import { createContext } from 'react';

interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

const MenusContext = createContext<IMenusContext>({});

export default MenusContext;
