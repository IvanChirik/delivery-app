import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { store } from '../store/store';


export const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
    const token = store.getState().user.token;
    if (!token)
        return <Navigate to='/auth/login' replace />;
    return children as JSX.Element;
};
