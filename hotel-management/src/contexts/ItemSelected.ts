import { Dispatch, createContext } from 'react';

export type TItemSelectAction = 'setData' | 'removeData';

interface IAction<T> {
  type: TItemSelectAction;
  payload: T;
}

interface IItemSelect {
  data?: any;
  dispatch?: Dispatch<IAction<unknown>>;
}

const ItemSelectContext = createContext<IItemSelect>({});

const itemSelectReducer =
  <T>() =>
  (state: T, action: IAction<T>) => {
    switch (action.type) {
      // Init data for the first load
      case 'setData': {
        const tempData = { ...state };

        return {
          data: tempData,
        };
      }

      default:
        throw new Error('Action unknown');
    }
  };

export { itemSelectReducer, ItemSelectContext };
