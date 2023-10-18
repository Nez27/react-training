import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import User from './pages/User';
import Dashboard from './pages/Dashboard';
import Room from './pages/Room';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="user" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="room" element={<Room />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
