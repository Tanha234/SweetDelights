import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Root from './Root';

import AdminRoute from './components/AdminRoute/AdminRoute';
import AdminPage from './components/AdminPage/AdminPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminPage />  {/* Your Admin page here */}
          </AdminRoute>
        ),
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
