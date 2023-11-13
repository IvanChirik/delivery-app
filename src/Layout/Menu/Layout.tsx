import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img src='user-icon.png' alt='Иконка пользователя' />
                    <div className={styles.name}>Ivan</div>
                    <div className={styles.email}>ivancherviakovskiy@mail.ru</div>
                </div>
                <div className={styles.menu}>
                    <NavLink to='/' className={({ isActive }) => cn(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <img src='./menu-icon.svg' alt='Иконка меню' />
                        Главная
                    </NavLink>
                    <NavLink to='/cart' className={({ isActive }) => cn(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <img src='./cart-icon.svg' alt='Иконка корзины' />
                        Корзина
                    </NavLink>
                </div>
                <Button className={styles.exit}>
                    <img src='./exit-icon.svg' alt='Иконка выхода' />
                    Выход</Button>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div >
    );
};

export default Layout;