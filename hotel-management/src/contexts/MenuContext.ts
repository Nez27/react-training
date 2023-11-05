import { Dispatch, SetStateAction, createContext } from 'react';

interface IMenusContext {
  openId?: string;
  close?: () => void;
  open?: Dispatch<SetStateAction<string>>;
}

const MenusContext = createContext<IMenusContext>({});

export default MenusContext;
