import { createBrowserRouter } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Home } = await import('./pages/home');
      return { Component: Home };
    },
  },
  {
    path: '/create-profile',
    lazy: async () => {
      const { CreateProfile } = await import('./pages/create-profile');
      return { Component: CreateProfile };
    },
  },
  {
    path: '/edit-profile/:profileId',
    lazy: async () => {
      const { EditProfile } = await import('./pages/edit-profile');
      return { Component: EditProfile };
    },
  },
]);
