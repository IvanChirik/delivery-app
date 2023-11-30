import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


export const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
    let token = localStorage.getItem('userData');
    token = token ? JSON.parse(token).token : null;
    if (!token)
        return <Navigate to='/auth/login' replace />;

    return children as JSX.Element;
};
