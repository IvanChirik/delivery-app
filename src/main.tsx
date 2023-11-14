import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './pages/Menu/Menu.tsx';
import Error from './pages/Error/Error.tsx';
import Layout from './Layout/Menu/Layout.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Product from './components/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { IProduct } from './interfaces/product.interface.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Menu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <Error />
      },
      {
        path: '/product/:id',
        element: <Product />,
        loader: async ({ params }) => {
          const { data } = await axios.get<IProduct>(`${PREFIX}/products/${params.id}`);
          return data;
        }
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
