import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';


export const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
    const token: string | null = useSelector((s: RootState) => s.user.token);
    if (!token)
        return <Navigate to='/auth/login' replace />;

    return children as JSX.Element;
};
