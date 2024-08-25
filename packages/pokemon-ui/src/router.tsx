import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './modules/Layout/Layout';


export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Home } = await import('./pages/home');
      return { Component: Home };
    },
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/edit-profile/:profileId',
        lazy: async () => {
          const { EditProfile } = await import('./pages/edit-profile');
          return { Component: EditProfile };
        },
      },
      {
        path: '/add-profile',
        lazy: async () => {
          const { AddProfile } = await import('./pages/add-profile');
          return { Component: AddProfile };
        },
      },
    ],
  },
]);
