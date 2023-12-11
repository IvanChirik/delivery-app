import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { store } from '../store/store';
import { setCart } from '../store/cart.slice';


export const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
    const token = store.getState().user.token;
    if (!token)
        return <Navigate to='/auth/login' replace />;
    store.dispatch(setCart());
    return children as JSX.Element;
};
