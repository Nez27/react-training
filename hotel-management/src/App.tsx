import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { Toaster } from 'react-hot-toast';

// Components
import AppLayout from './components/AppLayout';
import User from './pages/User';
import Dashboard from './pages/Dashboard';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

// Constants
import * as PATH from './constants/path';

function App() {
  return (
    <>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to={PATH.USER} />} />
              <Route path={PATH.DASHBOARD} element={<Dashboard />} />
              <Route path={PATH.USER} element={<User />} />
              <Route path={PATH.ROOM} element={<Room />} />
            </Route>
            <Route path={PATH.OTHER_PATH} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyleSheetManager>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px', zIndex: 1 }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </>
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
