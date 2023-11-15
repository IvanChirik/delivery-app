import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

const AuthLayout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.logo}>
                <img src='/label.svg' alt='Логотип магазина' />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;