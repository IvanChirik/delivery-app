import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import Error from './pages/Error/Error.tsx';
import MenuLayout from './Layout/Menu/MenuLayout.tsx';
import Cart from './pages/Cart/Cart.tsx';
import Product from './pages/Product/Product.tsx';
import { IProduct } from './interfaces/product.interface.ts';
import { Menu } from './pages/Menu/Menu.loader.tsx';
import AuthLayout from './Layout/Auth/AuthLayout.tsx';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Loader from './components/Loader/Loader.tsx';
import { $api } from './http/index.ts';
import Heading from './components/Heading/Heading.tsx';
import Success from './pages/Success/Success.tsx';

const LOADER_STYLES = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><MenuLayout /></RequireAuth>,
    children: [
      {
        path: '',
        element: <Suspense fallback={<div style={LOADER_STYLES}><Loader />
        </div>}>
          <Menu /></Suspense>
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'success',
        element: <Success />
      },
      {
        path: '*',
        element: <Error />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <div style={LOADER_STYLES}><Heading>Продукт отсутствует</Heading></div>,
        loader: async ({ params }) => {
          return defer({
            data: $api.get<IProduct>(`/products/${params.id}`).then(data => data)
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
