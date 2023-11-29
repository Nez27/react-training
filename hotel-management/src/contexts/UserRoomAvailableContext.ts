import { Dispatch, createContext } from 'react';

// Types
import { IDataState } from '@type/common';

interface IUserRoomState {
  usersAvailable: IDataState[];
  roomsAvailable: IDataState[];
}

type TAction =
  | 'initRoom'
  | 'initUser'
  | 'addRoom'
  | 'updateStatusRoom'
  | 'addUser'
  | 'updateStatusUser'
  | 'updateUserName'
  | 'updateRoomName';

interface IAction {
  type: TAction;
  payload: IDataState[];
}

interface IUserRoomAvailableContext {
  roomsAvailable?: IDataState[];
  usersAvailable?: IDataState[];
  dispatch?: Dispatch<IAction>;
}

const UserRoomAvailableContext = createContext<IUserRoomAvailableContext>({});

const initialState: IUserRoomState = {
  usersAvailable: [],
  roomsAvailable: [],
};

const reducer = (state: IUserRoomState, action: IAction) => {
  switch (action.type) {
    case 'initRoom':
      return {
        ...state,
        roomsAvailable: action.payload,
      };

    case 'initUser':
      return {
        ...state,
        usersAvailable: action.payload,
      };

    case 'addUser': {
      const tempArr = state.usersAvailable;
      const itemExist = state.usersAvailable.find(
        (item) => item.id === action.payload[0].id
      );

      if (!itemExist) {
        tempArr.push(action.payload[0]);
      }

      return {
        ...state,
        usersAvailable: tempArr,
      };
    }

    case 'updateUserName': {
      const tempArr = state.usersAvailable;

      if (action.payload[0].name) {
        const indexItemUpdate = tempArr.findIndex(
          (item) => item.id === action.payload[0].id
        );

        tempArr[indexItemUpdate].name = action.payload[0].name;
      }

      return {
        ...state,
        usersAvailable: tempArr,
      };
    }

    case 'updateStatusUser': {
      const tempArr = state.usersAvailable;
      const indexItemUpdate = tempArr.findIndex(
        (item) => item.id === action.payload[0].id
      );
      tempArr[indexItemUpdate].isBooked = action.payload[0].isBooked;

      return {
        ...state,
        usersAvailable: tempArr,
      };
    }

    case 'addRoom': {
      const tempArr = state.roomsAvailable;
      const itemExist = state.roomsAvailable.find(
        (item) => item.id === action.payload[0].id
      );

      if (!itemExist) {
        tempArr.push(action.payload[0]);
      }

      return {
        ...state,
        roomsAvailable: tempArr,
      };
    }

    case 'updateRoomName': {
      const tempArr = state.roomsAvailable;

      if (action.payload[0].name) {
        const indexItemUpdate = tempArr.findIndex(
          (item) => item.id === action.payload[0].id
        );

        tempArr[indexItemUpdate].name = action.payload[0].name;
      }

      return {
        ...state,
        roomsAvailable: tempArr,
      };
    }

    case 'updateStatusRoom': {
      const tempArr = state.roomsAvailable;
      const indexItemUpdate = tempArr.findIndex(
        (item) => item.id === action.payload[0].id
      );
      tempArr[indexItemUpdate].status = action.payload[0].status;

      return {
        ...state,
        roomsAvailable: tempArr,
      };
    }
    
    default:
      throw new Error('Action unknown');
  }
};

export { UserRoomAvailableContext, reducer, initialState };
