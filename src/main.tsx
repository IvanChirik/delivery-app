import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import Error from './pages/Error/Error.tsx';
import MenuLayout from './Layout/Menu/MenuLayout.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Product from './components/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { IProduct } from './interfaces/product.interface.ts';
import { Menu } from './pages/Menu/Menu.loader.tsx';
import AuthLayout from './Layout/Auth/AuthLayout.tsx';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      {
        path: '',
        element: <Suspense fallback={<>Загрузка....</>}><Menu /></Suspense>
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <Error />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: axios.get<IProduct>(`${PREFIX}/products/${params.id}`).then(data => data)
          });
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
