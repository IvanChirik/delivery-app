import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user.state';
import { DroppableArea } from '../../components/DroppableArea/DroppableArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect } from 'react';


const MenuLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token, userProfile } = useSelector((s: RootState) => s.user);
    const cartItems = useSelector((s: RootState) => s.cart.cartItems);
    const onLogout = () => {
        dispatch(logout());
    };
    useEffect(() => {
        !token && navigate('/auth/login');
    }, [token, navigate]);
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.layout}>
                <div className={styles.sidebar}>
                    <div className={styles.user}>
                        <img src='./user-icon.png' alt='Иконка пользователя' />
                        <div className={styles.name}>{userProfile?.name}</div>
                        <div className={styles.email}>{userProfile?.email}</div>
                    </div>
                    <div className={styles.menu}>
                        <NavLink to='/' className={({ isActive }) => cn(styles.link, {
                            [styles.active]: isActive
                        })}>
                            <img src='./menu-icon.svg' alt='Иконка меню' />
                            Главная
                        </NavLink>
                        <DroppableArea>
                            <NavLink to='/cart' className={({ isActive }) => cn(styles.link, {
                                [styles.active]: isActive
                            })}>
                                <img src='./cart-icon.svg' alt='Иконка корзины' />
                                Корзина
                                <div className={styles['cart-counter']}>{cartItems?.reduce((sum, item) => sum + item.quantity, 0)}</div>
                            </NavLink>
                        </DroppableArea>
                    </div>
                    <Button className={styles.exit} onClick={onLogout}>
                        <img src='./exit-icon.svg' alt='Иконка выхода' />
                        Выход</Button>
                </div>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div >
        </DndProvider >
    );
};

export default MenuLayout;