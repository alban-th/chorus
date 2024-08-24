import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { CreateProfile } from './pages/create-profile';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create-profile',
    element: <CreateProfile />,
  },
]);
