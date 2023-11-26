import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Components
import AppLayout from './components/AppLayout';
import User from './pages/User';
import Booking from './pages/Booking';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

// Constants
import * as PATH from './constants/path';
import Toast from './components/Toast';
import {
  UserRoomAvailableContext,
  initialState,
  reducer,
} from '@context/UserRoomAvailableContext';
import { useEffect, useReducer } from 'react';
import { getAllUsers } from '@service/userServices';
import { getAllRooms } from '@service/roomServices';

const queryClient = new QueryClient();

function App() {
  const [{ usersAvailable, roomsAvailable }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Init list user and room available
  useEffect(() => {
    const load = async () => {
      const tempUser = await getAllUsers('id', 'asc', '', 0);

      if (tempUser) {
        dispatch({ type: 'initUser', payload: tempUser.data });
      }

      const tempRoom = await getAllRooms('id', 'asc', '', 0);

      if (tempRoom) {
        dispatch({ type: 'initRoom', payload: tempRoom.data });
      }
    };

    load();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <UserRoomAvailableContext.Provider
          value={{ roomsAvailable, usersAvailable, dispatch }}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to={PATH.BOOKING} />} />
                <Route path={PATH.BOOKING} element={<Booking />} />
                <Route path={PATH.USER} element={<User />} />
                <Route path={PATH.ROOM} element={<Room />} />
              </Route>
              <Route path={PATH.OTHER_PATH} element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserRoomAvailableContext.Provider>
      </StyleSheetManager>

      <Toast />
    </QueryClientProvider>
  );
}

// Fix the error 'React does not recognize the "someProp" prop on a DOM element'. Link ref: https://github.com/orgs/styled-components/discussions/4136

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName: string, target: unknown) {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

export default App;
