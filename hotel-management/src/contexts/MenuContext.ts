import { createContext } from 'react';

// Interfaces
import { IMenusContext } from '../globals/interfaces';

const MenusContext = createContext<IMenusContext>({});

export default MenusContext;
