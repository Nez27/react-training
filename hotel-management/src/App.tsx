import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Components
import AppLayout from './ui/AppLayout';
import User from './pages/User';
import Dashboard from './pages/Dashboard';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

// Constants
import * as PATH from './constants/path';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
