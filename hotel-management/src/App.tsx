import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import AppLayout from './components/AppLayout';
import Toast from './components/Toast';
import RouteProtected from '@src/components/RouteProtected';
import RootLayout from '@src/components/RootLayout';

// Pages
import User from './pages/User';
import Booking from './pages/Booking';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import Login from '@src/pages/Login';
import Account from '@src/pages/Account';

// Constants
import * as PATH from './constants/path';
import SignUpAccount from "@src/pages/SignUpAccount";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route
                element={
                  <RouteProtected>
                    <AppLayout />
                  </RouteProtected>
                }
              >
                <Route index element={<Navigate replace to={PATH.BOOKING} />} />
                <Route path={PATH.BOOKING} element={<Booking />} />
                <Route path={PATH.USER} element={<User />} />
                <Route path={PATH.ROOM} element={<Room />} />
                <Route path={PATH.ACCOUNT} element={<Account />} />
                <Route path={PATH.SIGN_UP_ACCOUNT} element={<SignUpAccount />} />
              </Route>
              <Route path={PATH.LOGIN} element={<Login />} />
              <Route path={PATH.OTHER_PATH} element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
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
