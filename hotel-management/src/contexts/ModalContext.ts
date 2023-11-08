import { createContext } from 'react';

interface IModalContext {
  openName?: string;
  close?: () => void;
  open?: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<IModalContext>({});

export { ModalContext };
